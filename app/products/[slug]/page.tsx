"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";

type ProductImage = {
  id: string;
  image_url: string;
  sort_order: number;
};

type VariantOption = {
  value: string;
  priceAdjustment: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  product_images: ProductImage[];
  size_options: VariantOption[] | null;
  length_options: VariantOption[] | null;
  color_options: VariantOption[] | null;
};



export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<VariantOption | null>(null);
  const [selectedLength, setSelectedLength] = useState<VariantOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<VariantOption | null>(null);
  const [variantError, setVariantError] = useState("");

  const adjustedPrice =
    (product?.price || 0) +
    (selectedSize?.priceAdjustment || 0) +
    (selectedLength?.priceAdjustment || 0) +
    (selectedColor?.priceAdjustment || 0);


  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

     function handleAddToCart() {
    setVariantError("");

    if (product?.size_options && product.size_options.length > 0 && !selectedSize) {
      setVariantError("Please select a size.");
      return;
    }
    if (product?.length_options && product.length_options.length > 0 && !selectedLength) {
      setVariantError("Please select a length.");
      return;
    }
    if (product?.color_options && product.color_options.length > 0 && !selectedColor) {
      setVariantError("Please select a color.");
      return;
    }

    if (!product) return;

    const variantParts = [selectedSize, selectedLength, selectedColor]
      .filter((v): v is VariantOption => v !== null)
      .map((v) => v.value);
    const variantText = variantParts.length > 0 ? ` [${variantParts.join(", ")}]` : "";

    addItem({
      productId: product.id,
      slug,
      name: `${product.name}${variantText}`,
      price: adjustedPrice,
      image_url: images[0]?.image_url || null,
      quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function decreaseQuantity() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increaseQuantity() {
    setQuantity((q) => q + 1);
  }

  function handleQuantityInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  }

  useEffect(() => {
    async function loadProduct() {
      const { data } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("slug", slug)
        .single();

      if (data) {
        setProduct(data);
        const sorted = [...(data.product_images || [])].sort(
          (a, b) => a.sort_order - b.sort_order
        );
        setActiveImage(sorted[0]?.image_url || null);
      }
      setLoading(false);
    }
    loadProduct();
  }, [slug]);

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

  if (!product) {
    return (
      <main className="bg-ivory min-h-screen">
        <Navbar />
        <p className="pt-40 text-center font-sans text-charcoal/60">
          Product not found.
        </p>
      </main>
    );
  }

  const images = [...(product.product_images || [])].sort(
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
                  alt={product.name}
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
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-4">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {product.name}
            </h1>
             <p className="font-serif text-2xl text-charcoal mb-8">
              ₦{adjustedPrice.toFixed(2)}
            </p>


            {product.description && (
              <p className="font-sans text-base text-charcoal/70 leading-relaxed mb-8">
                {product.description}
              </p>
            )}

                        {product.size_options && product.size_options.length > 0 && (
              <div className="mb-6">
                <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.size_options.map((opt, index) => (
                    <button
                      key={`${opt.value}-${index}`}
                      onClick={() => setSelectedSize(opt)}
                      className={`px-4 py-2 border text-sm font-sans transition-colors ${
                        selectedSize?.value === opt.value
                          ? "border-gold bg-gold text-charcoal"
                          : "border-charcoal/20 text-charcoal hover:border-charcoal"
                      }`}
                    >
                      {opt.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.length_options && product.length_options.length > 0 && (
              <div className="mb-6">
                <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                  Length
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.length_options.map((opt, index) => (
                    <button
                      key={`${opt.value}-${index}`}
                      onClick={() => setSelectedLength(opt)}
                      className={`px-4 py-2 border text-sm font-sans transition-colors ${
                        selectedLength?.value === opt.value
                          ? "border-gold bg-gold text-charcoal"
                          : "border-charcoal/20 text-charcoal hover:border-charcoal"
                      }`}
                    >
                      {opt.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.color_options && product.color_options.length > 0 && (
              <div className="mb-6">
                <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
                  Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.color_options.map((opt, index) => (
                    <button
                      key={`${opt.value}-${index}`}
                      onClick={() => setSelectedColor(opt)}
                      className={`px-4 py-2 border text-sm font-sans transition-colors ${
                        selectedColor?.value === opt.value
                          ? "border-gold bg-gold text-charcoal"
                          : "border-charcoal/20 text-charcoal hover:border-charcoal"
                      }`}
                    >
                      {opt.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {variantError && (
              <p className="font-sans text-sm text-red-600 mb-4">
                {variantError}
              </p>
            )}


                       <div className="mb-8">
              <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-3">
                Quantity
              </label>
             <div className="inline-flex flex-row items-stretch border border-charcoal/20">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center font-sans text-charcoal hover:bg-cream transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <input
                  type="text"
                  inputMode="numeric"
                  value={quantity}
                  onChange={handleQuantityInput}
                  className="w-14 h-10 text-center bg-transparent font-sans text-charcoal focus:outline-none"
                />

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center font-sans text-charcoal hover:bg-cream transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={handleAddToCart}
                className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors"
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>

              <a
                href="/collections"
                className="border border-charcoal text-charcoal px-8 py-3 text-sm tracking-wide text-center hover:bg-charcoal hover:text-ivory transition-colors"
              >
                Continue Shopping
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
