export const dynamic = "force-dynamic";
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const { messages, documentIds } = json;
    const chatId = json.chatId || 'default-chat-id';

    const userMessage = messages[messages.length - 1];
    
    // Fetch uploaded documents if any
    let documentContext = "";
    if (documentIds && documentIds.length > 0) {
      const docs = await prisma.document.findMany({
        where: { id: { in: documentIds } }
      });
      for (const doc of docs) {
        documentContext += `\n\n--- Document: ${doc.name} ---\n${doc.content}\n--- End of Document ---\n\n`;
      }
    }
    
    // Create combined prompt for backend
    const combinedMessage = documentContext ? `${documentContext}\n\nUser Question:\n${userMessage.content}` : userMessage.content;

    // Fetch or create chat securely
    let chat = await prisma.chat.findUnique({
      where: { id: chatId }
    });

    if (chat && chat.userId !== session.user.id) {
      return new Response('Unauthorized access to chat', { status: 403 });
    }

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          id: chatId,
          userId: session.user.id,
          title: userMessage.content.substring(0, 50) + '...',
        }
      });
    }

    // Save the user message
    await prisma.message.create({
      data: {
        role: 'user',
        content: userMessage.content,
        chatId: chat.id
      }
    });

    // Chat history for Python backend and Cohere
    const chatHistoryForPython = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'chatbot' : 'user',
      content: msg.content
    }));

    const chatHistoryForCohere = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'assistant' || msg.role === 'chatbot' ? 'CHATBOT' : 'USER',
      message: msg.content
    }));

    let botReply = "";

    // 1. Try Python backend if configured or local dev (with fast 3.5s timeout to prevent Vercel 504 timeouts)
    const backendUrl = process.env.BACKEND_URL || (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5001' : null);

    if (backendUrl) {
      try {
        const controller = new AbortController();
        // 3.5-second abort prevents Vercel FUNCTION_INVOCATION_TIMEOUT when Render is asleep
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(`${backendUrl}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: combinedMessage,
            chat_history: chatHistoryForPython
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data?.response) {
            botReply = data.response;
          }
        }
      } catch (backendError) {
        console.warn("Backend call timed out or failed. Proceeding with direct Cohere fallback:", backendError);
      }
    }

    // 2. Direct Cohere API call (Fast sub-2s execution, bypasses Render cold starts)
    if (!botReply) {
      const cohereApiKey = (process.env.COHERE_API_KEY || "Kq78gMNXI62Exwk5MuwcYxaO4jfVlidvk7YnfYTv").trim();

      const cohereResponse = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cohereApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'command-r-plus-08-2024',
          message: combinedMessage,
          chat_history: chatHistoryForCohere,
          temperature: 0.7
        })
      });

      if (!cohereResponse.ok) {
        const errorText = await cohereResponse.text();
        throw new Error(`Cohere API failed (${cohereResponse.status}): ${errorText}`);
      }

      const cohereData = await cohereResponse.json();
      botReply = cohereData.text?.trim() || "No response received.";
    }

    // Save the assistant's response
    await prisma.message.create({
      data: {
        role: 'assistant',
        content: botReply,
        chatId: chat.id
      }
    });

    // Return as a standard JSON response
    return new Response(JSON.stringify({ response: botReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in chat route:', error);
    return new Response(error.message || String(error), {
      status: 500,
    });
  }
}


