import Navbar from "../components/Navbar";

export default function ShippingPolicy() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6 text-center">
            Policy
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12 text-center">
            Shipping Policy
          </h1>

          <div className="flex flex-col gap-10">
            <div>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                We currently deliver orders within and outside Nigeria.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-4">
                Orders are processed after payment has been confirmed.
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1">
                <li>Ready-to-ship items: 1–2 business days</li>
                <li>
                  Customised items: Processing time may be longer depending
                  on the design, usually 10–30 days.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                Delivery Times
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Estimated delivery after processing:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1 mb-4">
                <li>Lagos: 1–3 business days</li>
                <li>Other parts of Nigeria: 2–7 business days</li>
              </ul>

              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Outside Nigeria:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1 mb-4">
                <li>Express Shipping: 1–5 business days</li>
                <li>Standard Shipping (Air): 5–14 business days</li>
              </ul>

              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Please note: Business days exclude weekends and public
                holidays.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Delivery times are estimates and may vary due to courier
                delays, public holidays, festive periods, weather, road
                conditions, or other circumstances beyond our control.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                Delivery Fees
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Delivery charges depend on your location and will be
                calculated or communicated before your order is completed.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                Customer Responsibility
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Please provide an accurate:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1 mb-4">
                <li>Name</li>
                <li>Phone number</li>
                <li>State/city</li>
                <li>Complete delivery address</li>
              </ul>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                FUREVE is not responsible for delays or failed deliveries
                caused by incorrect or incomplete information provided by
                the customer.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                Failed Delivery
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                If a delivery fails because you are unavailable, unreachable,
                provide an incorrect address, or otherwise prevent delivery,
                additional delivery charges may apply for another attempt.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                If your package is returned to FUREVE, the applicable
                redelivery fee must be paid before it is dispatched again.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                After Delivery
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Please inspect your order immediately after receiving it and
                report any missing, damaged, or incorrect item(s) within 48
                hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
