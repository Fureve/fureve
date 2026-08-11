import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
          Fine & Custom Jewelry
        </p>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal leading-tight max-w-4xl">
          Jewelry as Individual as You Are
        </h1>

        <p className="font-sans text-base md:text-lg text-charcoal/70 max-w-xl mt-8 leading-relaxed">
          At FUREVE, we offer timeless jewelry (curated and personalized) that speak elegance, grace, style and purpose.
        </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="/collections"
            className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors"
          >
            Explore Collections
          </a>
          <a
            href="/custom"
            className="border border-charcoal text-charcoal px-8 py-3 text-sm tracking-wide hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Design Custom Piece
          </a>
        </div>

      </section>

      <Testimonials />
      <FAQ />

    </main>
  );
}
