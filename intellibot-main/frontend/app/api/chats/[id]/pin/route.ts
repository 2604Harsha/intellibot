import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { isPinned } = await req.json();

    // Workaround since TS might complain if Prisma Client isn't regenerated
    // We cast to any to bypass strict type checking just in case
    const chat = await (prisma.chat as any).update({
      where: { 
        id: params.id,
        userId: session.user.id
      },
      data: { isPinned }
    });

    return NextResponse.json(chat);
  } catch (error: any) {
    console.error('Error updating pin status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
