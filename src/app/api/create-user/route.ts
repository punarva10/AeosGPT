import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "../../../lib/db";

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const existingUserByEmail = await db.users.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");

    const newUser = await db.users.create({
      data: {
        name,
        email,
        password,
        token,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
    const mailOptions = {
      from: "Punarv Dinakar",
      to: newUser.email,
      subject: "Please Activate Your Account",
      text: `Hello ${newUser.name}, please activate your account by clicking on this link: https://localhost:3000/activate/${newUser.token}`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User Created and Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error is happening");
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
