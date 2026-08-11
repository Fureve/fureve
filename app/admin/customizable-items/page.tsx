"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  starting_price: number | null;
  customizable_item_images: { id: string; image_url: string; sort_order: number }[];
};

export default function AdminCustomizableItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    setLoading(true);
    const res = await fetch("/api/admin/customizable-items");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/customizable-items/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      alert("Failed to delete item.");
    }
  }

  return (
    <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin"
          className="font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mt-6 mb-10">
          <h1 className="font-serif text-3xl text-charcoal">
            Customizable Items
          </h1>
          <Link
            href="/admin/customizable-items/new"
            className="bg-charcoal text-ivory px-6 py-3 text-sm tracking-wide hover:bg-gold transition-colors text-center"
          >
            + Add Item
          </Link>
        </div>

        {loading ? (
          <p className="font-sans text-charcoal/60">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="font-sans text-charcoal/60">
            No customizable items yet. Click "Add Item" to create your first
            one.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const cover = [...(item.customizable_item_images || [])].sort(
                (a, b) => a.sort_order - b.sort_order
              )[0];

              return (
                <div
                  key={item.id}
                  className="bg-cream border border-charcoal/10 p-5"
                >
                  <div className="aspect-square bg-ivory border border-charcoal/10 mb-4 flex items-center justify-center overflow-hidden">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-sans text-xs text-charcoal/30 uppercase">
                        No Image
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg text-charcoal mb-1">
                    {item.name}
                  </h3>
                    {item.starting_price && (
                    <p className="font-sans text-sm text-charcoal/70 mb-4">
                      ₦{item.starting_price}
                    </p>
                  )}


                  <div className="flex gap-3">
                    <Link
                      href={`/admin/customizable-items/${item.id}`}
                      className="font-sans text-sm text-charcoal underline hover:text-gold transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="font-sans text-sm text-red-600 underline hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
