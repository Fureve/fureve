import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6 text-center">
            Policy
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12 text-center">
            Privacy Policy
          </h1>

          <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-10">
            FUREVE Enterprises ("FUREVE", "we", "us", or "our") respects your
            privacy and is committed to protecting the personal information
            you provide when you visit our website, place an order, contact
            us, or otherwise interact with our services. This Privacy Policy
            explains what information we collect, how we use it, and how we
            protect it.
          </p>

          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                1. Information We Collect
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1 mb-4">
                <li>Name, email address, and phone number</li>
                <li>Shipping and delivery address</li>
                <li>
                  Order details, including items purchased and quantities
                </li>
                <li>
                  Customisation details you provide (such as engraving text,
                  size, length, or colour selections)
                </li>
                <li>
                  Messages you send us through our Contact form or
                  customisation requests
                </li>
                <li>
                  Reviews and ratings you choose to submit, along with the
                  name you provide with them
                </li>
              </ul>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                We do not collect or store your card details. Payments are
                processed securely by Paystack, our third-party payment
                processor, and FUREVE never sees or retains your card number
                or banking credentials.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                2. How We Use Your Information
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside font-sans text-sm text-charcoal/70 leading-relaxed space-y-1">
                <li>Process, confirm, and fulfil your orders</li>
                <li>
                  Produce customised or personalised items according to your
                  specifications
                </li>
                <li>Communicate with you about your order or enquiry</li>
                <li>Respond to messages sent through our Contact form</li>
                <li>Display customer reviews on our website</li>
                <li>
                  Improve our website, products, and customer experience
                </li>
                <li>Comply with legal obligations where applicable</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                3. How Your Information Is Stored and Shared
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Your order and account-related information is stored
                securely using Supabase, our database provider. Order
                confirmations, contact form messages, and customisation
                requests are sent to FUREVE via Resend, our email service
                provider, so that your order can be processed.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-3">
                Payments are processed by Paystack. When you complete a
                purchase, Paystack processes your payment details directly;
                FUREVE only receives confirmation that payment was
                successful, along with a payment reference.
              </p>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                We do not sell, rent, or trade your personal information to
                third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                4. Cart Information
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Items you add to your shopping cart, including any
                customisation details, are stored locally in your browser so
                that your cart is preserved as you continue browsing. This
                information stays on your device and is only sent to us once
                you complete checkout.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                5. Customer Reviews
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                If you submit a review, the name and comment you provide,
                along with your star rating, will be displayed publicly on
                our website. Please do not include information in a review
                that you do not wish to be made public.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                6. Data Retention
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                We retain order and customer information for as long as
                necessary to process your order, respond to enquiries, meet
                legal or accounting requirements, and resolve any disputes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                7. Your Rights
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                You may contact us at any time to request access to,
                correction of, or deletion of your personal information,
                subject to any legal or legitimate business reasons we may
                have for retaining certain records.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                8. Third-Party Services
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Our website relies on third-party services, including
                Supabase (data storage), Resend (email delivery), and
                Paystack (payment processing), to operate. These providers
                have their own privacy practices, and Fureve is not
                responsible for their independent policies or actions.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                9. Changes to This Policy
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-charcoal mb-4">
                10. Contact Us
              </h2>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                If you have questions about this Privacy Policy or how your
                information is handled, please contact us through the
                contact details provided on our website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
