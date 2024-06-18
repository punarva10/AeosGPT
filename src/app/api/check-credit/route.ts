import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { teamId } = body;

  const userDetails = await db.users.findUnique({
    where: {
      email: session.user.email,
    },
  });

  try {
    const team = await db.teams.findUnique({
      where: { id: teamId },
    });

    if (team!.balance_credits == 0) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "useless.fake.acnt@gmail.com",
          pass: "vdhd cstj sslu gpjq",
        },
      });
      const mailOptions = {
        from: "Punarv Dinakar",
        to: userDetails?.email,
        subject: `Your credits for today in team ${team?.name} are emptied`,
        text: `Hello ${userDetails?.name}, your credits for today in team ${team?.name} are emptied. Please wait till it recharges or use a different team to create a session.`,
      };
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
    }

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
