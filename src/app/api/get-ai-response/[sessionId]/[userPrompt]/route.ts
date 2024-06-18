import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { Conversation } from "@/types/conversation";
import Groq from "groq-sdk";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string; userPrompt: string } }
) {
  const { sessionId, userPrompt } = params;

  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const groq_api_key = process.env.GROQ_API_KEY;
    const groq = new Groq({
      apiKey: groq_api_key,
    });

    const groQResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "mixtral-8x7b-32768",
    });

    const aiResponse = groQResponse.choices[0]?.message?.content ?? "";
    await db.conversations.create({
      data: {
        session_id: parseInt(sessionId),
        user_prompt: userPrompt,
        generated_result: aiResponse,
      },
    });

    return NextResponse.json({ aiResponse }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
