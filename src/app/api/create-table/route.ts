import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await sql`CREATE TABLE last_table ( Name varchar(255), Owner varchar(255) );`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM last_table;`;
  return NextResponse.json({ pets }, { status: 200 });
}
