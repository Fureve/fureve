"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VariantOptionsEditor, { VariantOption } from "../../../components/VariantOptionsEditor";

type Collection = {
  id: string;
  name: string;
  type: "products" | "customizable";
};

export default function NewCustomizableItem() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [hasSizes, setHasSizes] = useState(false);
  const [sizeOptions, setSizeOptions] = useState<VariantOption[]>([]);
  const [hasLengths, setHasLengths] = useState(false);
  const [lengthOptions, setLengthOptions] = useState<VariantOption[]>([]);
  const [hasColors, setHasColors] = useState(false);
  const [colorOptions, setColorOptions] = useState<VariantOption[]>([]);
  const [hasFonts, setHasFonts] = useState(false);
  const [fontOptions, setFontOptions] = useState<VariantOption[]>([]);
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCollections() {
      const res = await fetch("/api/admin/collections");
      const data = await res.json();
      const customizableCollections = (data.collections || []).filter(
        (c: Collection) => c.type === "customizable"
      );
      setCollections(customizableCollections);
    }
    loadCollections();
  }, []);

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
        size_options: hasSizes ? sizeOptions.filter((o) => o.value.trim()) : [],
        length_options: hasLengths ? lengthOptions.filter((o) => o.value.trim()) : [],
        color_options: hasColors ? colorOptions.filter((o) => o.value.trim()) : [],
        font_options: hasFonts ? fontOptions.filter((o) => o.value.trim()) : [],
        collection_id: collectionId || null,
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
            {collections.length === 0 && (
              <p className="font-sans text-xs text-charcoal/50 mt-2">
                No customizable-type collections yet. Create one under Manage
                Collections first if you'd like to group items.
              </p>
            )}
          </div>

                    <VariantOptionsEditor
            hasSizes={hasSizes}
            setHasSizes={setHasSizes}
            sizeOptions={sizeOptions}
            setSizeOptions={setSizeOptions}
            hasLengths={hasLengths}
            setHasLengths={setHasLengths}
            lengthOptions={lengthOptions}
            setLengthOptions={setLengthOptions}
            hasColors={hasColors}
            setHasColors={setHasColors}
            colorOptions={colorOptions}
            setColorOptions={setColorOptions}
            hasFonts={hasFonts}
            setHasFonts={setHasFonts}
            fontOptions={fontOptions}
            setFontOptions={setFontOptions}
          />


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
