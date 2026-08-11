"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useCart } from "@/lib/cart-context";

export default function Checkout() {
  const router = useRouter();
  const { items, totalPrice } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!customerName || !customerEmail || !shippingAddress) {
      setError("Name, email, and shipping address are required.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    // Save customer details temporarily so the success page can use them
    sessionStorage.setItem(
      "fureve_checkout_customer",
      JSON.stringify({ customerName, customerEmail, customerPhone, shippingAddress })
    );

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customerEmail,
        amount: totalPrice,
        metadata: {
          customerName,
          customerPhone,
          shippingAddress,
        },
      }),
    });

    const data = await res.json();

    setSubmitting(false);

    if (res.ok && data.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      setError(data.error || "Failed to start checkout. Please try again.");
    }
  }

  if (items.length === 0) {
    return (
      <main className="bg-ivory min-h-screen">
        <Navbar />
        <section className="pt-40 pb-24 px-6 text-center">
          <p className="font-sans text-charcoal/70 mb-8">
            Your cart is empty.
          </p>
          <a
            href="/collections"
            className="inline-block bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors"
          >
            Explore Collections
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-4 text-center">
            Checkout
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12 text-center">
            Your Details
          </h1>

          <div className="bg-cream border border-charcoal/10 p-6 mb-10">
            {items.map((item) => (
                
                <div
                key={item.cartItemId}
                className="flex justify-between text-sm font-sans text-charcoal/80 py-2 border-b border-charcoal/10 last:border-0"
              >

                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₦{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-serif text-lg text-charcoal pt-4">
              <span>Total</span>
              <span>₦{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
            <textarea
              rows={3}
              placeholder="Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors resize-none"
            />

            {error && <p className="font-sans text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors disabled:opacity-50"
            >
              {submitting ? "Redirecting to Payment..." : "Proceed to Payment"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
