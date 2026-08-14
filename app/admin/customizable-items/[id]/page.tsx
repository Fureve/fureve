"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import VariantOptionsEditor, { VariantOption } from "../../../components/VariantOptionsEditor";

type ItemImage = {
  id: string;
  image_url: string;
  sort_order: number;
};

type Collection = {
  id: string;
  name: string;
  type: "products" | "customizable";
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
  const [sizeOptions, setSizeOptions] = useState<VariantOption[]>([]);
  const [hasLengths, setHasLengths] = useState(false);
  const [lengthOptions, setLengthOptions] = useState<VariantOption[]>([]);
  const [hasColors, setHasColors] = useState(false);
  const [colorOptions, setColorOptions] = useState<VariantOption[]>([]);
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const [itemRes, collectionsRes] = await Promise.all([
        fetch(`/api/admin/customizable-items/${id}`),
        fetch("/api/admin/collections"),
      ]);

      const data = await itemRes.json();
      const collectionsData = await collectionsRes.json();

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
        if (item.size_options && item.size_options.length > 0) {
          setHasSizes(true);
          setSizeOptions(item.size_options);
        }
        if (item.length_options && item.length_options.length > 0) {
          setHasLengths(true);
          setLengthOptions(item.length_options);
        }
        if (item.color_options && item.color_options.length > 0) {
          setHasColors(true);
          setColorOptions(item.color_options);
        }
        if (item.collection_id) {
          setCollectionId(item.collection_id);
        }
      }

      const customizableCollections = (collectionsData.collections || []).filter(
        (c: Collection) => c.type === "customizable"
      );
      setCollections(customizableCollections);

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
        size_options: hasSizes ? sizeOptions.filter((o) => o.value.trim()) : [],
        length_options: hasLengths ? lengthOptions.filter((o) => o.value.trim()) : [],
        color_options: hasColors ? colorOptions.filter((o) => o.value.trim()) : [],
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
          />

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
