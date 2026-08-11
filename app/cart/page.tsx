"use client";

import Navbar from "../components/Navbar";
import { useCart } from "@/lib/cart-context";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <main className="bg-ivory min-h-screen">
      <Navbar />

      <section className="pt-40 pb-24 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold uppercase mb-4 text-center">
            Your Bag
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-16 text-center">
            Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center">
              <p className="font-sans text-base text-charcoal/70 mb-8">
                Your cart is currently empty.
              </p>
              <a
                href="/collections"
                className="inline-block bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide hover:bg-gold transition-colors"
              >
                Explore Collections
              </a>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 mb-12">
                {items.map((item) => (
                <div
                    key={item.cartItemId}
                    className="flex flex-col sm:flex-row sm:items-center gap-5 bg-cream border border-charcoal/10 p-5"
                  >

                    <div className="w-24 h-24 bg-ivory border border-charcoal/10 shrink-0 overflow-hidden">
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-sans text-[10px] text-charcoal/30 uppercase">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                                       <div className="flex-1 min-w-0">
                      {item.isCustom ? (
                        <p className="font-serif text-lg text-charcoal">
                          {item.name}
                        </p>
                      ) : (
                        <a
                          href={`/products/${item.slug}`}
                          className="font-serif text-lg text-charcoal hover:text-gold transition-colors"
                        >
                          {item.name}
                        </a>
                      )}
                      <p className="font-sans text-sm text-charcoal/70 mt-1">
                        ₦{item.price} each
                      </p>

                      {item.isCustom && (
                        <div className="mt-3 bg-ivory border border-charcoal/10 p-3">
                          <p className="font-sans text-xs tracking-widest text-gold uppercase mb-1">
                            Customization Details
                          </p>
                          <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                            {item.customizationDetails}
                          </p>
                          {item.customerContact && (
                            <p className="font-sans text-xs text-charcoal/50 mt-2">
                              Contact: {item.customerContact}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="inline-flex items-stretch border border-charcoal/20 mt-3">
                      <button
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity - 1)
                          }

                          className="w-8 h-8 flex items-center justify-center font-sans text-charcoal hover:bg-ivory transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center font-sans text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity + 1)
                          }

                          className="w-8 h-8 flex items-center justify-center font-sans text-charcoal hover:bg-ivory transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                                       <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start sm:text-right shrink-0">
                      <p className="font-serif text-lg text-charcoal sm:mb-3">
                        ₦{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="font-sans text-sm text-red-600 underline hover:text-red-800 transition-colors"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ))}
              </div>

              <div className="border-t border-charcoal/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <p className="font-serif text-2xl text-charcoal">
                  Total: ₦{totalPrice.toFixed(2)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/collections"
                    className="border border-charcoal text-charcoal px-8 py-3 text-sm tracking-wide text-center hover:bg-charcoal hover:text-ivory transition-colors"
                  >
                    Continue Shopping
                  </a>
                   <a
                    href="/checkout"
                    className="bg-charcoal text-ivory px-8 py-3 text-sm tracking-wide text-center hover:bg-gold transition-colors"
                  >
                    Checkout
                  </a>

                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
