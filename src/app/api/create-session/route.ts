import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { teamId, title } = body;

  try {
    const team = await db.teams.findUnique({
      where: { id: teamId },
    });

    if (team!.balance_credits == 0) {
      throw new Error("Team does not have enough credits to create a session.");
    }

    const session = await db.sessions.create({
      data: {
        team_id: parseInt(teamId),
        title,
      },
    });

    await db.teams.update({
      where: { id: teamId },
      data: { balance_credits: { decrement: 1 } },
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
