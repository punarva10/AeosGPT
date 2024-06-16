import db from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const user = await db.users.findUnique({
    where: {
      token: token,
    },
  });

  if (!user) {
    throw new Error("Invalid Token");
  }

  await db.users.update({
    where: {
      id: user.id,
    },
    data: {
      verified: true,
    },
  });

  redirect("/auth");
}
