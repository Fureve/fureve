"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCollection() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"products" | "customizable">("products");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Name is required.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/admin/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, type }),
    });


    setSaving(false);

    if (res.ok) {
      router.push("/admin/collections");
    } else {
      setError("Failed to save collection.");
    }
  }

  return (
    <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-xl mx-auto">
        <Link
          href="/admin/collections"
          className="font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          ← Back to Collections
        </Link>

        <h1 className="font-serif text-3xl text-charcoal mt-6 mb-8">
          Add Collection
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bridal Collection"
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
          </div>

                    <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Description (optional)
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Collection Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setType("products")}
                className={`flex-1 px-4 py-3 border text-sm font-sans transition-colors ${
                  type === "products"
                    ? "border-gold bg-gold text-charcoal"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal"
                }`}
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => setType("customizable")}
                className={`flex-1 px-4 py-3 border text-sm font-sans transition-colors ${
                  type === "customizable"
                    ? "border-gold bg-gold text-charcoal"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal"
                }`}
              >
                Customizable Items
              </button>
            </div>
            <p className="font-sans text-xs text-charcoal/50 mt-2">
              This determines whether regular products or customizable items
              can be added to this collection.
            </p>
          </div>

          {error && <p className="font-sans text-sm text-red-600">{error}</p>}


          <button
            type="submit"
            disabled={saving}
            className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors disabled:opacity-50 self-start"
          >
            {saving ? "Saving..." : "Save Collection"}
          </button>
        </form>
      </div>
    </main>
  );
}
