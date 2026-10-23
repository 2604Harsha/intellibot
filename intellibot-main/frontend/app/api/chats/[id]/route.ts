import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chat = await prisma.chat.findFirst({
      where: { id: id, userId: session.user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error: any) {
    console.error('Error fetching chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const { folderId, isPinned, title } = json;

    let chat = await prisma.chat.findFirst({
      where: { id: id, userId: session.user.id }
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found or unauthorized' }, { status: 404 });
    }

    chat = await prisma.chat.update({
      where: { id: id },
      data: {
        ...(folderId !== undefined && { folderId }),
        ...(isPinned !== undefined && { isPinned }),
        ...(title !== undefined && { title }),
      }
    });

    return NextResponse.json(chat);
  } catch (error: any) {
    console.error('Error updating chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
