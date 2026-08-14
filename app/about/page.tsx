import Navbar from "../components/Navbar";

export default function About() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
            The Fureve Story
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-8">
            Where Craft Meets Character
          </h1>

          <p className="font-sans text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed mb-16">
            Fureve was founded on a simple belief: jewelry should be personal.
            We work with fine metals and ethically sourced stones to create
            both curated collections and fully bespoke pieces — each one
            designed in close collaboration with you, from first sketch to
            final polish.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">
                Fine Collections
              </h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Thoughtfully designed pieces ready to wear, crafted with the
                same care as our custom work.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">
                Custom Jewelry Sets
              </h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                Matching sets designed entirely around you — rings, earrings,
                and necklaces built as one story.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">
                Personal Consultation
              </h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                FUREVE was founded on a belief; jewelry should be special to oneself. We work with fine and ethically sourced metals and other materials to create curated collections and fully bespoke pieces — each one designed in close collaboration with you, from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
