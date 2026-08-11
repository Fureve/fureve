"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCustomizableItem() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [hasSizes, setHasSizes] = useState(false);
  const [sizesInput, setSizesInput] = useState("");
  const [hasLengths, setHasLengths] = useState(false);
  const [lengthsInput, setLengthsInput] = useState("");
  const [hasColors, setHasColors] = useState(false);
  const [colorsInput, setColorsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Name is required.");
      return;
    }

    setSaving(true);

    let image_urls: string[] = [];

    if (imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("files", file));

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
      image_urls = uploadData.urls;
    }

        const res = await fetch("/api/admin/customizable-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        starting_price: startingPrice ? parseFloat(startingPrice) : null,
        image_urls,
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
          Add Customizable Item
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
              placeholder="e.g. Classic Signet Ring"
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
                Price (₦) — optional
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
              Images
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="w-full font-sans text-sm text-charcoal"
            />
            <p className="font-sans text-xs text-charcoal/50 mt-2">
              The first image selected becomes the cover photo.
            </p>

                        {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {previews.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
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


          {error && <p className="font-sans text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors disabled:opacity-50 self-start"
          >
            {saving ? "Saving..." : "Save Item"}
          </button>
        </form>
      </div>
    </main>
  );
}
