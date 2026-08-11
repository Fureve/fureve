"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";

type ItemImage = {
  id: string;
  image_url: string;
  sort_order: number;
};

type Item = {
  id: string;
  name: string;
  description: string | null;
  starting_price: number | null;
  customizable_item_images: ItemImage[];
  sizes: string[] | null;
  lengths: string[] | null;
  colors: string[] | null;
};


export default function CustomItemPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

   const { addItem } = useCart();
  const [details, setDetails] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const DETAILS_LIMIT = 15;


  useEffect(() => {
    async function loadItem() {
      const { data } = await supabase
        .from("customizable_items")
        .select("*, customizable_item_images(*)")
        .eq("slug", slug)
        .single();

      if (data) {
        setItem(data);
        const sorted = [...(data.customizable_item_images || [])].sort(
          (a, b) => a.sort_order - b.sort_order
        );
        setActiveImage(sorted[0]?.image_url || null);
      }
      setLoading(false);
    }
    loadItem();
  }, [slug]);

      function handleAddToCart() {
    setError("");

    if (item?.sizes && item.sizes.length > 0 && !selectedSize) {
      setError("Please select a size.");
      return;
    }
    if (item?.lengths && item.lengths.length > 0 && !selectedLength) {
      setError("Please select a length.");
      return;
    }
    if (item?.colors && item.colors.length > 0 && !selectedColor) {
      setError("Please select a color.");
      return;
    }

    if (!item) return;

    const variantParts = [selectedSize, selectedLength, selectedColor].filter(
      Boolean
    );
    const variantText = variantParts.length > 0 ? ` [${variantParts.join(", ")}]` : "";

    addItem({
      productId: item.id,
      slug: `custom-${item.id}`,
      name: `${item.name} (Custom)`,
      price: item.starting_price || 0,
      image_url: images[0]?.image_url || null,
      quantity: 1,
      isCustom: true,
      customizationDetails: `${details}${variantText}`,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }


  if (loading) {
    return (
      <main className="bg-ivory min-h-screen">
        <Navbar />
        <p className="pt-40 text-center font-sans text-charcoal/60">
          Loading...
        </p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="bg-ivory min-h-screen">
        <Navbar />
        <p className="pt-40 text-center font-sans text-charcoal/60">
          Item not found.
        </p>
      </main>
    );
  }

  const images = [...(item.customizable_item_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-cream border border-charcoal/10 mb-4 flex items-center justify-center overflow-hidden">
              {activeImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-sans text-xs tracking-widest text-charcoal/30 uppercase">
                  No Image
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img.image_url)}
                    className={`w-20 h-20 border overflow-hidden transition-colors ${
                      activeImage === img.image_url
                        ? "border-gold"
                        : "border-charcoal/10"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info + Request Form */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-4">
              Customizable
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {item.name}
            </h1>
               {item.starting_price && (
              <p className="font-serif text-xl text-charcoal mb-4">
                ₦{item.starting_price}
              </p>
            )}

            {item.description && (
              <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-8">
                {item.description}
              </p>
            )}

                          <div className="flex flex-col gap-5">
              {item.sizes && item.sizes.length > 0 && (
                <div>
                  <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                  {item.sizes.map((size, index) => (
                      <button
                        key={`${size}-${index}`}

                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border text-sm font-sans transition-colors ${
                          selectedSize === size
                            ? "border-gold bg-gold text-charcoal"
                            : "border-charcoal/20 text-charcoal hover:border-charcoal"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {item.lengths && item.lengths.length > 0 && (
                <div>
                  <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                    Length
                  </p>
                  <div className="flex flex-wrap gap-2">
                  {item.lengths.map((length, index) => (
                      <button
                        key={`${length}-${index}`}

                        onClick={() => setSelectedLength(length)}
                        className={`px-4 py-2 border text-sm font-sans transition-colors ${
                          selectedLength === length
                            ? "border-gold bg-gold text-charcoal"
                            : "border-charcoal/20 text-charcoal hover:border-charcoal"
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {item.colors && item.colors.length > 0 && (
                <div>
                  <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                  {item.colors.map((color, index) => (
                      <button
                        key={`${color}-${index}`}

                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border text-sm font-sans transition-colors ${
                          selectedColor === color
                            ? "border-gold bg-gold text-charcoal"
                            : "border-charcoal/20 text-charcoal hover:border-charcoal"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                  What should we engrave on your jewelry? (optional)
                </p>
                <textarea
                  rows={2}
                  maxLength={DETAILS_LIMIT}
                  placeholder="e.g. Forever & Always"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors resize-none"
                />
                <p className="font-sans text-xs text-charcoal/50 mt-1 text-right">
                  {details.length}/{DETAILS_LIMIT} characters
                </p>
              </div>

              {error && (
                <p className="font-sans text-sm text-red-600">{error}</p>
              )}

              <button
                onClick={handleAddToCart}
                className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors self-start"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>


          </div>
        </div>
      </section>
    </main>
  );
}
