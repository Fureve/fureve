"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type Collection = {
  id: string;
  name: string;
};

type ProductImage = {
  id: string;
  image_url: string;
  sort_order: number;
};

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const [productRes, collectionsRes] = await Promise.all([
        fetch(`/api/admin/products/${id}`),
        fetch("/api/admin/collections"),
      ]);

      const productData = await productRes.json();
      const collectionsData = await collectionsRes.json();

      if (productData.product) {
        const p = productData.product;
        setName(p.name);
        setCategory(p.category);
        setPrice(String(p.price));
        setCollectionId(p.collection_id || "");
        setExistingImages(
          (p.product_images || []).sort(
            (a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order
          )
        );
      }

      setCollections(collectionsData.collections || []);
      setLoading(false);
    }
    loadData();
  }, [id]);

  function handleNewFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setNewImageFiles(files);
    setNewPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  function handleRemoveExistingImage(imageId: string) {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    setRemovedImageIds((prev) => [...prev, imageId]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !category || !price) {
      setError("Name, category, and price are required.");
      return;
    }

    setSaving(true);

    let new_image_urls: string[] = [];

    if (newImageFiles.length > 0) {
      const formData = new FormData();
      newImageFiles.forEach((file) => formData.append("files", file));

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setError("Image upload failed.");
        setSaving(false);
        return;
      }

      const uploadData = await uploadRes.json();
      new_image_urls = uploadData.urls;
    }

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        price: parseFloat(price),
        collection_id: collectionId || null,
        new_image_urls,
        removed_image_ids: removedImageIds,
      }),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Failed to save product.");
    }
  }

  if (loading) {
    return (
      <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
        <p className="font-sans text-charcoal/60 max-w-xl mx-auto">
          Loading product...
        </p>
      </main>
    );
  }

  return (
    <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-xl mx-auto">
        <Link
          href="/admin"
          className="font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          ← Back to Products
        </Link>

        <h1 className="font-serif text-3xl text-charcoal mt-6 mb-8">
          Edit Product
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
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Collection (optional)
            </label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            >
              <option value="">No collection</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Current Images
            </label>
            {existingImages.length === 0 ? (
              <p className="font-sans text-sm text-charcoal/50 mb-2">
                No images yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3 mb-4">
                {existingImages.map((img) => (
                  <div key={img.id} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt="Product"
                      className="w-24 h-24 object-cover border border-charcoal/10"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(img.id)}
                      className="absolute -top-2 -right-2 bg-charcoal text-ivory rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="block font-sans text-xs tracking-widest text-charcoal/70 uppercase mb-2">
              Add More Images
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleNewFileChange}
              className="w-full font-sans text-sm text-charcoal"
            />

            {newPreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {newPreviews.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`New preview ${i + 1}`}
                    className="w-24 h-24 object-cover border border-charcoal/10"
                  />
                ))}
              </div>
            )}
          </div>

          {error && <p className="font-sans text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors disabled:opacity-50 self-start"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
