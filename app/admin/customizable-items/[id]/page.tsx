"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type ItemImage = {
  id: string;
  image_url: string;
  sort_order: number;
};

export default function EditCustomizableItem() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [existingImages, setExistingImages] = useState<ItemImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [hasSizes, setHasSizes] = useState(false);
  const [sizesInput, setSizesInput] = useState("");
  const [hasLengths, setHasLengths] = useState(false);
  const [lengthsInput, setLengthsInput] = useState("");
  const [hasColors, setHasColors] = useState(false);
  const [colorsInput, setColorsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    async function loadItem() {
      const res = await fetch(`/api/admin/customizable-items/${id}`);
      const data = await res.json();

            if (data.item) {
        const item = data.item;
        setName(item.name);
        setDescription(item.description || "");
        setStartingPrice(item.starting_price ? String(item.starting_price) : "");
        setExistingImages(
          (item.customizable_item_images || []).sort(
            (a: ItemImage, b: ItemImage) => a.sort_order - b.sort_order
          )
        );
        if (item.sizes && item.sizes.length > 0) {
          setHasSizes(true);
          setSizesInput(item.sizes.join(", "));
        }
        if (item.lengths && item.lengths.length > 0) {
          setHasLengths(true);
          setLengthsInput(item.lengths.join(", "));
        }
        if (item.colors && item.colors.length > 0) {
          setHasColors(true);
          setColorsInput(item.colors.join(", "));
        }
      }

      setLoading(false);
    }
    loadItem();
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

    if (!name) {
      setError("Name is required.");
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

        const res = await fetch(`/api/admin/customizable-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        starting_price: startingPrice ? parseFloat(startingPrice) : null,
        new_image_urls,
        removed_image_ids: removedImageIds,
        sizes: hasSizes
          ? sizesInput.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        lengths: hasLengths
          ? lengthsInput.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        colors: hasColors
          ? colorsInput.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      }),
    });


    setSaving(false);

    if (res.ok) {
      router.push("/admin/customizable-items");
    } else {
      setError("Failed to save item.");
    }
  }

  if (loading) {
    return (
      <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
        <p className="font-sans text-charcoal/60 max-w-xl mx-auto">
          Loading item...
        </p>
      </main>
    );
  }

  return (
    <main className="bg-ivory min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-xl mx-auto">
        <Link
          href="/admin/customizable-items"
          className="font-sans text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          ← Back to Customizable Items
        </Link>

        <h1 className="font-serif text-3xl text-charcoal mt-6 mb-8">
          Edit Customizable Item
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
               Price ($) — optional
            </label>
            <input
              type="number"
              step="0.01"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
            />
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
                      alt="Item"
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

          <div className="border border-charcoal/10 p-5 flex flex-col gap-5">
            <p className="font-sans text-xs tracking-widest text-charcoal/70 uppercase">
              Variant Options
            </p>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={hasSizes}
                  onChange={(e) => setHasSizes(e.target.checked)}
                />
                <span className="font-sans text-sm text-charcoal">
                  This item comes in different sizes
                </span>
              </label>
              {hasSizes && (
                <input
                  type="text"
                  placeholder="e.g. 6, 7, 8, 9 (comma separated)"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  className="w-full bg-transparent border border-charcoal/20 px-4 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={hasLengths}
                  onChange={(e) => setHasLengths(e.target.checked)}
                />
                <span className="font-sans text-sm text-charcoal">
                  This item comes in different lengths
                </span>
              </label>
              {hasLengths && (
                <input
                  type="text"
                  placeholder="e.g. 16in, 18in, 20in (comma separated)"
                  value={lengthsInput}
                  onChange={(e) => setLengthsInput(e.target.value)}
                  className="w-full bg-transparent border border-charcoal/20 px-4 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={hasColors}
                  onChange={(e) => setHasColors(e.target.checked)}
                />
                <span className="font-sans text-sm text-charcoal">
                  This item comes in different colors
                </span>
              </label>
              {hasColors && (
                <input
                  type="text"
                  placeholder="e.g. Gold, Silver, Rose Gold (comma separated)"
                  value={colorsInput}
                  onChange={(e) => setColorsInput(e.target.value)}
                  className="w-full bg-transparent border border-charcoal/20 px-4 py-2 font-sans text-sm text-charcoal focus:outline-none focus:border-gold transition-colors"
                />
              )}
            </div>
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
