import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.log("SMTP credentials missing, simulating email send:", {
        name,
        email,
        message,
      });
      return NextResponse.json({
        success: true,
        message: "Email simulation successful (credentials missing)",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "sebastian.glahn89@googlemail.com",
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      messageID: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
