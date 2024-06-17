import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await db.teams.updateMany({
      data: {
        balance_credits: {
          increment: 10,
        },
      },
    });
    return NextResponse.json(
      { message: "Credits updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating credits" },
      { status: 500 }
    );
  }
}
