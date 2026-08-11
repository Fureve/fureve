import Navbar from "../../components/Navbar";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: collection } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!collection) {
    notFound();
  }

  const { data: products } = await supabase
    .from("products")
    .select("*, product_images(*)")
    .eq("collection_id", collection.id)
    .order("created_at", { ascending: false });

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 px-6 text-center">
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
          Collection
        </p>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal">
          {collection.name}
        </h1>
        {collection.description && (
          <p className="font-sans text-base text-charcoal/70 max-w-xl mx-auto mt-6 leading-relaxed">
            {collection.description}
          </p>
        )}
      </section>

      <section className="px-6 pb-24 md:pb-32">
        {!products || products.length === 0 ? (
          <p className="text-center font-sans text-charcoal/60">
            No pieces in this collection yet. Check back soon.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((piece) => {
              const cover = [...(piece.product_images || [])].sort(
                (a, b) => a.sort_order - b.sort_order
              )[0];

              return (
                <a
                  key={piece.id}
                  href={`/products/${piece.slug}`}
                  className="group text-center"
                >
                  <div className="aspect-square bg-cream border border-charcoal/10 mb-5 flex items-center justify-center overflow-hidden">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover.image_url}
                        alt={piece.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="font-sans text-xs tracking-widest text-charcoal/30 uppercase">
                        Image
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs tracking-widest text-gold uppercase mb-2">
                    {piece.category}
                  </p>
                  <h3 className="font-serif text-lg text-charcoal mb-1">
                    {piece.name}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/70">
                    ₦{piece.price}
                  </p>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
