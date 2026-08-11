import Navbar from "../components/Navbar";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Custom() {
  const { data: items } = await supabase
    .from("customizable_items")
    .select("*, customizable_item_images(*)")
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

      <section className="px-6 pb-24 md:pb-32">
        {!items || items.length === 0 ? (
          <p className="text-center font-sans text-charcoal/60">
            No customizable pieces available yet. Check back soon.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {items.map((item) => {
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
        )}
      </section>
    </main>
  );
}
