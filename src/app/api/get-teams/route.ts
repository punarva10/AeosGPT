import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
    const memberships = await db.memberships.findMany({
      where: { user_id: user?.id },
    });

    const teamIds = memberships.map((membership) => {
      return membership.team_id;
    });

    const teams = await Promise.all(
      teamIds.map(async (teamId) => {
        const teamData = await db.teams.findUnique({
          where: {
            id: teamId,
          },
        });
        return {
          id: teamId,
          name: teamData?.name,
          balance_credits: teamData?.balance_credits,
        };
      })
    );

    return NextResponse.json({ teams }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
