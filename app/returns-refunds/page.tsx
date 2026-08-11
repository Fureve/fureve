import Navbar from "../components/Navbar";

export default function ReturnsRefunds() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6 text-center">
            Policy
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12 text-center">
            Return & Refund Policy
          </h1>

          <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
            At Fureve, we want you to love your purchase. Please read this
            policy before placing your order.
          </p>

          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                1. Returns & Replacements
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                We accept returns or replacements only where an item is:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed mb-4 space-y-1">
                <li>Damaged when received;</li>
                <li>Defective; or</li>
                <li>Different from the item ordered.</li>
              </ul>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                You must contact us within 48 hours of delivery.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Please send your order number and clear photos/videos of the
                item and packaging when reporting an issue.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                2. Items We Do Not Accept for Return
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                We do not accept returns or refunds for:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1">
                <li>Change of mind;</li>
                <li>Wrong size selected by the customer;</li>
                <li>Items that have been worn, altered, damaged, or misused;</li>
                <li>
                  Damage caused by exposure to water, perfume, chemicals,
                  sweat, or improper care; and
                </li>
                <li>
                  Customised or personalised jewelry, unless the item is
                  defective or Fureve made an error.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                3. Customised Orders
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Customised items are made specifically for you and cannot be
                cancelled, returned, or refunded once production has started,
                except where the item is defective or Fureve made an error.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Customers are responsible for providing accurate names,
                spellings, measurements, colours, designs, and other
                specifications.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                4. Refunds
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Where a refund is approved, it will be processed through the
                original payment method where possible.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Refund processing time may depend on your bank or payment
                provider.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
