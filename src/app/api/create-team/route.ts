import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
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
  const { teamName, sessionName } = body;

  if (!teamName || typeof teamName !== "string") {
    return NextResponse.json({ message: "Invalid team name" }, { status: 400 });
  }

  const user = await db.users.findUnique({
    where: {
      email: session.user.email,
    },
  });

  try {
    const team = await db.teams.create({
      data: {
        name: teamName,
        owner_id: user!.id,
      },
    });

    await db.memberships.create({
      data: {
        team_id: team.id,
        user_id: user!.id,
      },
    });

    const chatSession = await db.sessions.create({
      data: {
        team_id: team.id,
        title: sessionName,
      },
    });

    return NextResponse.json(
      { team: team, chatSession: chatSession },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
