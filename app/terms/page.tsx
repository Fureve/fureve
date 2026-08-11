import Navbar from "../components/Navbar";

export default function Terms() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6 text-center">
            Policy
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12 text-center">
            Terms of Service
          </h1>

          <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
            By accessing the Fureve website or placing an order, you agree
            to these Terms of Service.
          </p>

          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                1. Products
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Fureve sells jewelry, watches, and related accessories,
                including customised pieces.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Product colours and appearance may vary slightly from images
                due to lighting, photography, and individual screen
                settings.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                2. Orders
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                An order is confirmed after successful payment.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Fureve reserves the right to cancel an order where an item is
                unavailable, there is an obvious pricing/listing error,
                fraudulent activity is suspected, or circumstances beyond our
                control prevent fulfilment.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Any applicable refund will be processed where an order is
                cancelled by Fureve.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                3. Customised Orders
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Customers are responsible for providing accurate
                customisation details, including names, spellings,
                measurements, colours, sizes, and designs.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Once production has started, customised orders cannot
                ordinarily be changed or cancelled.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                4. Prices & Payment
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                All prices are displayed in Nigerian Naira unless otherwise
                stated.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Prices may change without notice, but confirmed and paid
                orders will generally not be affected.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Payment must be completed before an order is processed
                unless Fureve has expressly agreed otherwise.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                5. Jewelry Care
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Our jewelry should be handled with care. Avoid unnecessary
                contact with:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1 mb-4">
                <li>Water</li>
                <li>Perfume</li>
                <li>Lotions and cosmetics</li>
                <li>Sweat</li>
                <li>Chemicals and cleaning products</li>
              </ul>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Tarnishing, fading, scratches, or damage resulting from
                normal wear or improper care are not considered
                manufacturing defects.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                6. Third-Party Services
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Our website may use third-party services such as payment
                processors, delivery companies, and technology providers.
                Fureve is not responsible for the independent policies or
                actions of these third parties.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                7. Contact
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                For questions about these Terms, contact Fureve through the
                contact details provided on our website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
