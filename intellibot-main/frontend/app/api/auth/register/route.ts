import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return new NextResponse("Missing credentials", { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return new NextResponse("Email already taken", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      }
    })

  } catch (error: any) {
    console.error("REGISTRATION_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
