"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useCart } from "@/lib/cart-context";
import { deliveryRates } from "@/lib/delivery-rates";

export default function Checkout() {
  const router = useRouter();
  const { items, totalPrice } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [deliveryType, setDeliveryType] = useState<"home" | "park" | "">("");
  const [selectedZone, setSelectedZone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedRate = deliveryRates.find((r) => r.state === selectedState);
  const selectedZoneData = selectedRate?.zones?.find((z) => z.name === selectedZone);

  const deliveryFee = !selectedRate
    ? 0
    : selectedRate.type === "pickup"
    ? 0
    : selectedRate.type === "flat"
    ? selectedRate.flatPrice || 0
    : selectedRate.type === "zones"
    ? selectedZoneData?.price || 0
    : deliveryType === "home"
    ? selectedRate.homePrice || 0
    : deliveryType === "park"
    ? selectedRate.parkPrice || 0
    : 0;

  const grandTotal = totalPrice + deliveryFee;



    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!customerName || !customerEmail || !shippingAddress) {
      setError("Name, email, and shipping address are required.");
      return;
    }

    if (!selectedState) {
      setError("Please select a delivery state.");
      return;
    }

    if (selectedRate?.type === "choice" && !deliveryType) {
      setError("Please choose Home Delivery or Park Delivery.");
      return;
    }

    if (selectedRate?.type === "zones" && !selectedZone) {
      setError("Please select your delivery area.");
      return;
    }


    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    // Save customer details temporarily so the success page can use them
        const deliveryDetail =
      selectedRate?.type === "zones"
        ? selectedZone
        : selectedRate?.type === "choice"
        ? deliveryType
        : "N/A";

    sessionStorage.setItem(
      "fureve_checkout_customer",
      JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        deliveryState: selectedState,
        deliveryType: deliveryDetail,
        deliveryFee,
      })
    );

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customerEmail,
        amount: grandTotal,
        metadata: {
          customerName,
          customerPhone,
          shippingAddress,
          deliveryState: selectedState,
          deliveryType: deliveryDetail,
          deliveryFee,
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
            {selectedState && (
              <div className="flex justify-between text-sm font-sans text-charcoal/80 py-2 border-b border-charcoal/10">
                <span>Delivery ({selectedState})</span>
                <span>₦{deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-serif text-lg text-charcoal pt-4">
              <span>Total</span>
              <span>₦{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
              <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                Delivery State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setDeliveryType("");
                  setSelectedZone("");
                }}
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
              >
                <option value="">Select a state</option>
                {deliveryRates.map((rate) => (
                  <option key={rate.state} value={rate.state}>
                    {rate.state}
                  </option>
                ))}
              </select>
            </div>

            {selectedRate?.type === "zones" && (
              <div>
                <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                  Delivery Area
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select your area</option>
                  {selectedRate.zones?.map((zone) => (
                    <option key={zone.name} value={zone.name}>
                      {zone.name} — ₦{zone.price}
                    </option>
                  ))}
                </select>
                {selectedZoneData?.areas && (
                  <p className="font-sans text-xs text-charcoal/50 mt-2">
                    Includes: {selectedZoneData.areas}
                  </p>
                )}
              </div>
            )}

            {selectedRate?.type === "choice" && (

              <div>
                <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                  Delivery Method
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("home")}
                    className={`flex-1 px-4 py-3 border text-sm font-sans transition-colors ${
                      deliveryType === "home"
                        ? "border-gold bg-gold text-charcoal"
                        : "border-charcoal/20 text-charcoal hover:border-charcoal"
                    }`}
                  >
                    Home Delivery — ₦{selectedRate.homePrice}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("park")}
                    className={`flex-1 px-4 py-3 border text-sm font-sans transition-colors ${
                      deliveryType === "park"
                        ? "border-gold bg-gold text-charcoal"
                        : "border-charcoal/20 text-charcoal hover:border-charcoal"
                    }`}
                  >
                    Park Delivery — ₦{selectedRate.parkPrice}
                  </button>
                </div>
              </div>
            )}

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
