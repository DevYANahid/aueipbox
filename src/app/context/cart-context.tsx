
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const deliveryFee = 15;

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setItems((previous) => {
      const existing = previous.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        if (existing.quantity >= product.stock) {
          return previous;
        }

        return previous.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: number) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.product.id !== productId) return item;

        if (item.quantity >= item.product.stock) return item;

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (productId: number) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.product.id !== productId) return item;

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      })
    );
  };

  const removeFromCart = (productId: number) => {
    setItems((previous) =>
      previous.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.product.salePrice * item.quantity,
    0
  );

  const total = subtotal + (items.length > 0 ? deliveryFee : 0);

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      deliveryFee,
      total,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, cartCount, subtotal, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
