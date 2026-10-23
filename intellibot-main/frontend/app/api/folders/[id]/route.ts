import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure the folder belongs to the user before deleting
    const folder = await prisma.folder.findFirst({
      where: { id: id, userId: session.user.id }
    });

    if (!folder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    await prisma.folder.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting folder:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
