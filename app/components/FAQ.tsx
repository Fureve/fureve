"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does customization take?",
    answer: "Production takes 10–30 days.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery within Lagos takes a day or two. No same-day delivery except on Saturdays. Delivery outside Lagos takes 2–5 working days. No park delivery option due to package safety.",
  },
  {
    question: "Do you sell real gold?",
    answer:
      "No, we don't. Our jewelry materials are mostly titanium steel and stainless steel, which are very durable with proper care.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="py-24 md:py-32 px-6 bg-ivory">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
            Questions
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-charcoal/10 bg-cream"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left px-6 py-5"
              >
                <span className="font-serif text-lg text-charcoal">
                  {faq.question}
                </span>
                <span
                  className={`font-sans text-xl text-gold transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
