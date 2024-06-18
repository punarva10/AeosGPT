import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "../../../lib/db";

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
        user: "useless.fake.acnt@gmail.com",
        pass: "wfwm ulgr taid fsdo",
      },
    });
    const mailOptions = {
      from: "Punarv Dinakar",
      to: newUser.email,
      subject: "Please Activate Your Account",
      text: `Hello ${newUser.name}, please activate your account by clicking on this link: https://aeos-gpt.vercel.app/activate/${newUser.token}`,
    };
    console.log("Going to try and send email now");
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    alert("Please Verify Your email address.");
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
