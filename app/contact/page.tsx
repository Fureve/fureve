"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !message) {
      setError("Name, email, and message are required.");
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, subject, message }),
    });

    setSubmitting(false);

    if (res.ok) {
      setSubmitted(true);
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
            Contact
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-6">
            Connect With Fureve
          </h1>
          <p className="font-sans text-base text-charcoal/70 leading-relaxed">
            For product inquiries, custom orders, or general questions, feel
            free to reach out to us.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <div className="bg-cream border border-charcoal/10 p-8 md:p-10">
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-8">
              Contact Information
            </p>

            <div className="mb-8">
              <p className="font-sans text-xs tracking-widest text-charcoal/50 uppercase mb-2">
                Email
              </p>
              <a
                href="mailto:hellofureve@gmail.com"
                className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
              >
                hellofureve@gmail.com
              </a>
            </div>

            <div className="mb-8">
              <p className="font-sans text-xs tracking-widest text-charcoal/50 uppercase mb-2">
                WhatsApp
              </p>
              <a
                href="https://wa.me/2348133686132"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mb-8">
              <p className="font-sans text-xs tracking-widest text-charcoal/50 uppercase mb-2">
                Location
              </p>
              <p className="font-serif text-lg text-charcoal">
                Lagos, Nigeria
              </p>
            </div>

            <div>
              <p className="font-sans text-xs tracking-widest text-charcoal/50 uppercase mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/fureve.ng?igsh=MWVlc2Vjb3N1b3ZqNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-charcoal hover:text-gold transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/2348133686132"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-charcoal hover:text-gold transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Send a Message Card */}
          <div className="bg-cream border border-charcoal/10 p-8 md:p-10">
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-8">
              Send a Message
            </p>

            {submitted ? (
              <div>
                <p className="font-serif text-lg text-charcoal mb-2">
                  Message sent!
                </p>
                <p className="font-sans text-sm text-charcoal/70">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-ivory border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-ivory border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-ivory border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-ivory border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors resize-none"
                />

                {error && (
                  <p className="font-sans text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors disabled:opacity-50 self-start"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
