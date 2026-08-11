"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();


  const links = [
    { href: "/collections", label: "Collections" },
    { href: "/custom", label: "Custom Jewelry" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ivory/90 backdrop-blur-sm border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a
          href="/"
          className="font-serif text-2xl tracking-widest text-charcoal"
        >
          FUREVE
        </a>

        <div className="hidden md:flex items-center gap-10 font-sans text-sm tracking-wide text-charcoal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

                <a
          href="/cart"
          aria-label="View cart"
          className="hidden md:flex items-center justify-center relative hover:text-gold transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[10px] font-sans w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </a>



        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-charcoal transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden bg-ivory border-t border-charcoal/10 px-6 py-6 flex flex-col gap-6 font-sans text-sm tracking-wide text-charcoal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
                   
                      <a
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 hover:text-gold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart{totalItems > 0 ? ` (${totalItems})` : ""}
          </a>


        </div>
      )}
    </nav>
  );
}
