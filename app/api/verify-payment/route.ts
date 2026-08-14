import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, items, totalPrice, customer } = body;

    if (!reference) {
      return NextResponse.json({ error: "Reference is required" }, { status: 400 });
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json(
        { error: "Payment could not be verified", verified: false },
        { status: 400 }
      );
    }

    // Payment confirmed — send the order email
    const itemsHtml = items
      .map((item: any) => {
        const customBlock = item.isCustom
          ? `
            <p style="margin: 4px 0; color: #b8860b;"><strong>Customization:</strong> ${item.customizationDetails || "N/A"}</p>
            ${item.customerContact ? `<p style="margin: 4px 0;"><strong>Item Contact Note:</strong> ${item.customerContact}</p>` : ""}
          `
          : "";

        return `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0;">
              <p style="margin: 0; font-weight: bold;">${item.name}${item.isCustom ? " (Custom)" : ""}</p>
              ${customBlock}
            </td>
            <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px 0; text-align: right;">₦${item.price.toFixed(2)}</td>
            <td style="padding: 10px 0; text-align: right;">₦${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `;
      })
      .join("");

    const deliveryFee = customer.deliveryFee || 0;
    const grandTotal = totalPrice + deliveryFee;

    await resend.emails.send({
      from: "Fureve Website <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      replyTo: customer.customerEmail,
      subject: `New Order from ${customer.customerName} — Payment Confirmed`,
      html: `
        <h2>New Order Received (Payment Confirmed)</h2>
        <p><strong>Customer:</strong> ${customer.customerName}</p>
        <p><strong>Email:</strong> ${customer.customerEmail}</p>
        ${customer.customerPhone ? `<p><strong>Phone:</strong> ${customer.customerPhone}</p>` : ""}
        ${customer.shippingAddress ? `<p><strong>Shipping Address:</strong> ${customer.shippingAddress}</p>` : ""}
        <p style="background: #fdf6e3; padding: 10px; border-left: 4px solid #b8860b;">
          <strong>Deliver To State:</strong> ${customer.deliveryState || "Not specified"}<br/>
          ${customer.deliveryType && customer.deliveryType !== "N/A" ? `<strong>Delivery Method:</strong> ${customer.deliveryType === "home" ? "Home Delivery" : "Park Delivery"}` : ""}
        </p>
        <p><strong>Payment Reference:</strong> ${reference}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="border-bottom: 2px solid #333; text-align: left;">
              <th style="padding: 8px 0;">Item</th>
              <th style="padding: 8px 0; text-align: center;">Qty</th>
              <th style="padding: 8px 0; text-align: right;">Price</th>
              <th style="padding: 8px 0; text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 12px;">Delivery Fee: ₦${deliveryFee.toFixed(2)}</p>
        <p style="margin-top: 8px; font-size: 18px;"><strong>Total: ₦${grandTotal.toFixed(2)}</strong></p>
      `,
    });

    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return NextResponse.json(
      { error: "Verification failed", verified: false },
      { status: 500 }
    );
  }
}
