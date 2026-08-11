"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  product_images: { id: string; image_url: string; sort_order: number }[];
};


export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete product.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-2">
              Fureve Admin
            </p>
            <h1 className="font-serif text-3xl text-charcoal">Products</h1>
          </div>

                    <div className="flex items-center justify-between gap-4 md:justify-end">
             <Link
              href="/admin/collections"
              className="font-sans text-sm text-charcoal underline hover:text-gold transition-colors"
            >
              Manage Collections
            </Link>
                       <Link
              href="/admin/customizable-items"
              className="font-sans text-sm text-charcoal underline hover:text-gold transition-colors"
            >
              Manage Custom Items
            </Link>
            <Link
              href="/admin/reviews"
              className="font-sans text-sm text-charcoal underline hover:text-gold transition-colors"
            >
              Manage Reviews
            </Link>


            <Link
              href="/admin/products/new"
              className="bg-charcoal text-ivory px-6 py-3 text-sm tracking-wide hover:bg-gold transition-colors text-center"
            >
              + Add Product
            </Link>
            <button
              onClick={handleLogout}
              className="font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors"
            >
              Log Out
            </button>
          </div>

        </div>

        {loading ? (
          <p className="font-sans text-charcoal/60">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="font-sans text-charcoal/60">
            No products yet. Click "Add Product" to create your first one.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-cream border border-charcoal/10 p-5"
              >
                               <div className="aspect-square bg-ivory border border-charcoal/10 mb-4 flex items-center justify-center overflow-hidden">
                  {product.product_images && product.product_images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        [...product.product_images].sort(
                          (a, b) => a.sort_order - b.sort_order
                        )[0].image_url
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-sans text-xs text-charcoal/30 uppercase">
                      No Image
                    </span>
                  )}
                </div>


                <p className="font-sans text-xs tracking-widest text-gold uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-charcoal mb-1">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-charcoal/70 mb-4">
                  ₦{product.price}
                </p>

                <div className="flex gap-3">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-sans text-sm text-charcoal underline hover:text-gold transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="font-sans text-sm text-red-600 underline hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
