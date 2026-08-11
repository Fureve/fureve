import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  isCustom?: boolean;
  customizationDetails?: string;
  customerContact?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      items,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentReference,
    } = body as {
      items: OrderItem[];
      totalPrice: number;
      customerName: string;
      customerEmail: string;
      customerPhone?: string;
      shippingAddress?: string;
      paymentReference?: string;
    };

    if (!items || items.length === 0 || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Items, customer name, and email are required" },
        { status: 400 }
      );
    }

    const itemsHtml = items
      .map((item) => {
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

    await resend.emails.send({
      from: "Fureve Website <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      replyTo: customerEmail,
      subject: `New Order from ${customerName}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        ${customerPhone ? `<p><strong>Phone:</strong> ${customerPhone}</p>` : ""}
        ${shippingAddress ? `<p><strong>Shipping Address:</strong> ${shippingAddress}</p>` : ""}
        ${paymentReference ? `<p><strong>Payment Reference:</strong> ${paymentReference}</p>` : ""}

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

        <p style="margin-top: 20px; font-size: 18px;"><strong>Total: ₦${totalPrice.toFixed(2)}</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order email failed:", err);
    return NextResponse.json(
      { error: "Failed to send order email" },
      { status: 500 }
    );
  }
}
