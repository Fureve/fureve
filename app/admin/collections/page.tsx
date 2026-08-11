"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Collection = {
  id: string;
  name: string;
  description: string | null;
};

export default function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCollections() {
    setLoading(true);
    const res = await fetch("/api/admin/collections");
    const data = await res.json();
    setCollections(data.collections || []);
    setLoading(false);
  }

  useEffect(() => {
    loadCollections();
  }, []);

  async function handleDelete(id: string) {
    if (
      !confirm(
        "Delete this collection? Products inside it will not be deleted — they'll just become uncategorized."
      )
    )
      return;

    const res = await fetch(`/api/admin/collections/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setCollections((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert("Failed to delete collection.");
    }
  }

  return (
    <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mt-6 mb-10">
          <h1 className="font-serif text-3xl text-charcoal">Collections</h1>
          <Link
            href="/admin/collections/new"
            className="bg-charcoal text-ivory px-6 py-3 text-sm tracking-wide hover:bg-gold transition-colors text-center"
          >
            + Add Collection
          </Link>
        </div>

        {loading ? (
          <p className="font-sans text-charcoal/60">Loading collections...</p>
        ) : collections.length === 0 ? (
          <p className="font-sans text-charcoal/60">
            No collections yet. Click "Add Collection" to create your first
            one.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-cream border border-charcoal/10 p-5 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-serif text-lg text-charcoal">
                    {collection.name}
                  </h3>
                  {collection.description && (
                    <p className="font-sans text-sm text-charcoal/70 mt-1">
                      {collection.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 shrink-0 ml-4">
                  <Link
                    href={`/admin/collections/${collection.id}`}
                    className="font-sans text-sm text-charcoal underline hover:text-gold transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(collection.id)}
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
