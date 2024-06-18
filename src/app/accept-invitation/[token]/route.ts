import db from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  const team = await db.teams.findUnique({
    where: {
      token: token,
    },
  });

  if (!team) {
    throw new Error("Invalid Token");
  }

  if (!userId) {
    throw new Error("Invalid User");
  }

  await db.memberships.create({
    data: {
      team_id: team.id,
      user_id: parseInt(userId),
    },
  });

  redirect("/auth");
}
