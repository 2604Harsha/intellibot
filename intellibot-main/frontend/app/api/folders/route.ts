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

    const folders = await prisma.folder.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { chats: true }
        }
      }
    });

    return NextResponse.json(folders);
  } catch (error: any) {
    console.error('Error fetching folders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const { name } = json;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        userId: session.user.id,
      }
    });

    return NextResponse.json(folder);
  } catch (error: any) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

