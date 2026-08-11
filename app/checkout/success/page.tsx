"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
    const { items, totalPrice, clearCart, loaded } = useCart();

  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    if (!loaded || hasVerified) return;

    async function verify() {
      setHasVerified(true);

      const reference = searchParams.get("reference") || searchParams.get("trxref");

      if (!reference) {
        setStatus("failed");
        return;
      }

      const storedCustomer = sessionStorage.getItem("fureve_checkout_customer");
      const customer = storedCustomer ? JSON.parse(storedCustomer) : null;

      if (!customer) {
        setStatus("failed");
        return;
      }

      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          items,
          totalPrice,
          customer,
        }),
      });

      const data = await res.json();

      if (res.ok && data.verified) {
        setStatus("success");
        clearCart();
        sessionStorage.removeItem("fureve_checkout_customer");
      } else {
        setStatus("failed");
      }
    }

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 px-6 text-center">
        {status === "verifying" && (
          <p className="font-sans text-charcoal/70">
            Confirming your payment...
          </p>
        )}

        {status === "success" && (
          <div className="max-w-md mx-auto">
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6">
              Order Confirmed
            </p>
            <h1 className="font-serif text-3xl text-charcoal mb-6">
              Thank You!
            </h1>
            <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
              Your order has been received and is being processed. We'll be
              in touch shortly with next steps.
            </p>
            <a
              href="/collections"
              className="inline-block bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        )}

        {status === "failed" && (
          <div className="max-w-md mx-auto">
            <h1 className="font-serif text-3xl text-charcoal mb-6">
              Payment Could Not Be Verified
            </h1>
            <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
              If you were charged, please contact us with your payment
              reference so we can confirm your order manually.
            </p>
            <a
              href="/contact"
              className="inline-block bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors"
            >
              Contact Us
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
