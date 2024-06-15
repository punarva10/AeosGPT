import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await sql`DROP TABLE last_table`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM final_test_table;`;
  return NextResponse.json({ pets }, { status: 200 });
}
