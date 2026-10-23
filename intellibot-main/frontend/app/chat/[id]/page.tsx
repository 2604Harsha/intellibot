"use client";

import { useEffect, useState } from "react";
import { ChatUI } from "@/features/chat/components/ChatUI";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function HistoricalChatPage() {
  const params = useParams();
  const id = params.id as string;
  const [messages, setMessages] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/chats/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Chat not found");
        return res.json();
      })
      .then(data => {
        // map Prisma messages to AI SDK format
        const formatted = data.messages.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content
        }));
        setMessages(formatted);
      })
      .catch(e => setError(e.message));
  }, [id]);

  if (error) {
    return <div className="flex-1 flex items-center justify-center text-[#A1A1AA] font-inter">Error: {error}</div>;
  }

  if (!messages) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#A1A1AA]">
        <Loader2 className="w-8 h-8 animate-spin text-[#5436DA]" />
      </div>
    );
  }

  return <ChatUI initialId={id} initialMessages={messages} />;
}
