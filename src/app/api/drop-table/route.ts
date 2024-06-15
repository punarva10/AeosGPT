import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Test database connection
    const connectionTest = await sql`SELECT 1;`;
    console.log("Database connection test result:", connectionTest);

    // Attempt to drop the table
    const result = await sql`DROP TABLE New_table`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error dropping table:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
