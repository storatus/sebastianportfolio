import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API Key missing, simulating email send:", {
      name,
      email,
      message,
    });
    return NextResponse.json({
      success: true,
      message: "Email simulation successful",
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Update this with your verified domain
      to: ["your-email@example.com"], // Update this with your email
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
