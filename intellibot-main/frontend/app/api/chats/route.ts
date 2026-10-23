export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { messages: true }
        }
      }
    });

    return NextResponse.json(chats);
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete all chats for the user
    await prisma.chat.deleteMany({
      where: { userId: session.user.id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting chats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

