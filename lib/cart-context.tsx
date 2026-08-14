"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  cartItemId: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
  isCustom?: boolean;
  customizationDetails?: string;
  customerContact?: string;
};

export type NewCartItem = Omit<CartItem, "cartItemId">;


type CartContextType = {
  items: CartItem[];
  addItem: (item: NewCartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loaded: boolean;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "fureve_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

      function addItem(newItem: NewCartItem) {
    setItems((prev) => {
      if (!newItem.isCustom) {
        const existing = prev.find(
          (i) =>
            !i.isCustom &&
            i.productId === newItem.productId &&
            i.name === newItem.name
        );

        if (existing) {
          return prev.map((i) =>
            i.cartItemId === existing.cartItemId
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
        }
      }

      const cartItemId = `${newItem.productId}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;

      return [...prev, { ...newItem, cartItemId }];
    });
  }

  function removeItem(cartItemId: string) {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  }

  function updateQuantity(cartItemId: string, quantity: number) {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    );
  }


  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
       <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loaded,
      }}
    >

      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
