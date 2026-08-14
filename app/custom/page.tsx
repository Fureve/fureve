import Navbar from "../components/Navbar";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Custom() {
  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .eq("type", "customizable")
    .order("created_at", { ascending: false });

  const { data: uncategorized } = await supabase
    .from("customizable_items")
    .select("*, customizable_item_images(*)")
    .is("collection_id", null)
    .order("created_at", { ascending: false });

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 px-6 text-center">
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
          Made For You
        </p>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal">
          Custom Jewelry
        </h1>
        <p className="font-sans text-base text-charcoal/70 max-w-xl mx-auto mt-6 leading-relaxed">
          Browse pieces available for customization, choose your favorite,
          and tell us exactly how you'd like it made yours.
        </p>
      </section>

      {collections && collections.length > 0 && (
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <a
                key={collection.id}
                href={`/custom/collections/${collection.slug}`}
                className="group block bg-cream border border-charcoal/10 p-8 text-center hover:border-gold transition-colors"
              >
                <h2 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {collection.name}
                </h2>
                {collection.description && (
                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                    {collection.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {uncategorized && uncategorized.length > 0 && (
        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl text-charcoal mb-10 text-center">
              More Pieces
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {uncategorized.map((item) => {
                const cover = [...(item.customizable_item_images || [])].sort(
                  (a, b) => a.sort_order - b.sort_order
                )[0];

                return (
                  <a
                    key={item.id}
                    href={`/custom/${item.slug}`}
                    className="group text-center"
                  >
                    <div className="aspect-square bg-cream border border-charcoal/10 mb-5 flex items-center justify-center overflow-hidden">
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="font-sans text-xs tracking-widest text-charcoal/30 uppercase">
                          Image
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg text-charcoal mb-1">
                      {item.name}
                    </h3>
                    {item.starting_price && (
                      <p className="font-sans text-sm text-charcoal/70">
                        ₦{item.starting_price}
                      </p>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {(!collections || collections.length === 0) &&
        (!uncategorized || uncategorized.length === 0) && (
          <section className="px-6 pb-24 text-center">
            <p className="font-sans text-charcoal/60">
              No customizable pieces available yet. Check back soon.
            </p>
          </section>
        )}
    </main>
  );
}
