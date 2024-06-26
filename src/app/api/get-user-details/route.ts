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

  try {
    const user = await db.users.findUnique({
      where: {
        email: session.user.email,
      },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
