import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("trying to create table");
    const result =
      await sql`CREATE TABLE test_table ( Name varchar(255), Owner varchar(255) );`;
    console.log("created table");
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
