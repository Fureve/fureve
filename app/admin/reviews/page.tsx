"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Review = {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    setLoading(true);
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();
    setReviews(data.reviews || []);
    setLoading(false);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete review.");
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

        <h1 className="font-serif text-3xl text-charcoal mt-6 mb-10">
          Customer Reviews
        </h1>

        {loading ? (
          <p className="font-sans text-charcoal/60">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="font-sans text-charcoal/60">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-cream border border-charcoal/10 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-serif text-lg text-charcoal">
                      {review.customer_name}
                    </p>
                    <p className="text-gold text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="font-sans text-sm text-red-600 underline hover:text-red-800 transition-colors shrink-0"
                  >
                    Delete
                  </button>
                </div>
                <p className="font-sans text-sm text-charcoal/70">
                  {review.review_text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
