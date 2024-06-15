import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get("petName");
  const ownerName = searchParams.get("ownerName");

  try {
    if (!petName || !ownerName) throw new Error("Pet and owner names required");
    await sql`INSERT INTO pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
