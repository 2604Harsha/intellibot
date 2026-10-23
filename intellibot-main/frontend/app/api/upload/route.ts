export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Use CommonJS require to avoid strict ESM default export errors in Next.js bundler
const pdfParse = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const chatId = formData.get("chatId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    // Extract text based on file type
    if (file.type === "application/pdf") {
      try {
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (e) {
        console.error("PDF Parsing Error:", e);
        return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
      }
    } else if (file.type === "text/plain" || file.type === "text/csv") {
      extractedText = buffer.toString("utf-8");
    } else {
      // Unhandled types: try to read as text anyway or throw error
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    // Truncate to avoid exploding database limit (just in case)
    if (extractedText.length > 500000) {
      extractedText = extractedText.substring(0, 500000) + "...[TRUNCATED]";
    }

    // Save to database
    const document = await prisma.document.create({
      data: {
        name: file.name,
        type: file.type,
        url: "local://" + file.name, // Placeholder URL since we are keeping it in DB for now
        content: extractedText,
        chatId: chatId || null,
      }
    });

    return NextResponse.json({ 
      success: true, 
      document: {
        id: document.id,
        name: document.name,
        type: document.type,
      }
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

