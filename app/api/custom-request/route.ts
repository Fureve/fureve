import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemName, customerName, customerEmail, customerPhone, details } = body;

    if (!customerName || !customerEmail || !details) {
      return NextResponse.json(
        { error: "Name, email, and details are required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Fureve Website <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      replyTo: customerEmail,
      subject: `Custom Request: ${itemName}`,
      html: `
        <h2>New Custom Jewelry Request</h2>
        <p><strong>Item:</strong> ${itemName}</p>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone || "Not provided"}</p>
        <p><strong>Customization Details:</strong></p>
        <p>${details.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Custom request email failed:", err);
    return NextResponse.json(
      { error: "Failed to send request" },
      { status: 500 }
    );
  }
}
