export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory px-6 md:px-12 pt-20 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <p className="font-serif text-2xl tracking-widest mb-4">FUREVE</p>
          <p className="font-sans text-sm text-ivory/60 leading-relaxed">
            Fine and custom jewelry, crafted with intention and made to be
            treasured for a lifetime.
          </p>
        </div>

        <div>
          <p className="font-serif text-lg mb-5">Legal</p>
          <ul className="flex flex-col gap-3 font-sans text-sm text-ivory/60">
            <li>
              <a href="/privacy-policy" className="hover:text-gold transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/returns-refunds" className="hover:text-gold transition-colors">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="/shipping-policy" className="hover:text-gold transition-colors">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gold transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-serif text-lg mb-5">Brand</p>
          <ul className="flex flex-col gap-3 font-sans text-sm text-ivory/60">
            <li>
              <a href="/about" className="hover:text-gold transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/collections" className="hover:text-gold transition-colors">
                Collections
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gold transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

                <div>
          <p className="font-serif text-lg mb-5">Contact</p>
          <ul className="flex flex-col gap-3 font-sans text-sm text-ivory/60">
            <li>
              <a href="mailto:hellofureve@gmail.com" className="hover:text-gold transition-colors">
                hellofureve@gmail.com
              </a>
            </li>
            <li>Lagos, Nigeria</li>
          </ul>

          <div className="flex gap-4 mt-5">
             <a href="https://www.instagram.com/fureve.ng?igsh=MWVlc2Vjb3N1b3ZqNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors">
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
              <a href="https://wa.me/2348133686132" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-gold transition-colors">
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

      <div className="max-w-7xl mx-auto border-t border-ivory/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-sans text-xs text-ivory/50">
        <p>© 2026 Fureve</p>
        <p>Designed with intention.</p>
      </div>
    </footer>
  );
}
