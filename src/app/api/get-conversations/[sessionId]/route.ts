import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { Conversation } from "@/types/conversation";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;

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

  const user = await db.users.findUnique({
    where: {
      email: session.user.email,
    },
  });

  try {
    const conversations: Conversation[] = await db.conversations.findMany({
      where: { session_id: parseInt(sessionId) },
    });

    return NextResponse.json({ conversations }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
