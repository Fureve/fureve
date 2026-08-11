"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
};

function StarRating({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onChange && onChange(star)}
          className={`text-lg ${
            star <= rating ? "text-gold" : "text-charcoal/20"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function loadReviews() {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data.reviews || []);
    setLoading(false);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!customerName || rating === 0 || !reviewText) {
      setError("Please add your name, a star rating, and a review.");
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        rating,
        review_text: reviewText,
      }),
    });

    setSubmitting(false);

    if (res.ok) {
      setSubmitted(true);
      setCustomerName("");
      setRating(0);
      setReviewText("");
      loadReviews();
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-6">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal">
            What Our Customers Say
          </h2>
        </div>

        {loading ? (
          <p className="text-center font-sans text-charcoal/60 mb-16">
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <p className="text-center font-sans text-charcoal/60 mb-16">
            No reviews yet. Be the first to share your experience.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-ivory border border-charcoal/10 p-6"
              >
                <StarRating rating={review.rating} />
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed mt-4 mb-4">
                  "{review.review_text}"
                </p>
                <p className="font-serif text-base text-charcoal">
                  — {review.customer_name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-lg mx-auto bg-ivory border border-charcoal/10 p-8">
          <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6 text-center">
            Leave a Review
          </p>

          {submitted ? (
            <p className="text-center font-sans text-sm text-charcoal/70">
              Thank you for your review!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors"
              />

              <div className="flex items-center gap-3">
                <span className="font-sans text-sm text-charcoal/70">
                  Your Rating:
                </span>
                <StarRating rating={rating} interactive onChange={setRating} />
              </div>

              <textarea
                rows={4}
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-transparent border border-charcoal/20 px-4 py-3 font-sans text-charcoal focus:outline-none focus:border-gold transition-colors resize-none"
              />

              {error && (
                <p className="font-sans text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors disabled:opacity-50 self-center"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
