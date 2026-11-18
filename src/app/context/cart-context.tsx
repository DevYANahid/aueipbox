
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
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
  isHydrated: boolean;
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const STORAGE_KEY = "iptv-world-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const deliveryFee = 15;

  // LOAD CART FROM LOCAL STORAGE
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          const validItems = parsedCart.filter((item): item is CartItem => {
            return (
              item !== null &&
              typeof item === "object" &&
              item.product !== null &&
              typeof item.product === "object" &&
              typeof item.product.id === "number" &&
              typeof item.quantity === "number" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
            );
          });

          setItems(validItems);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // SAVE CART TO LOCAL STORAGE
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [items, isHydrated]);

  // ADD TO CART
  const addToCart = useCallback((product: Product) => {
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
            ? {
                ...item,
                product,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }, []);

  // INCREASE QUANTITY
  const increaseQuantity = useCallback((productId: number) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.product.id !== productId) return item;

        if (item.quantity >= item.product.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }, []);

  // DECREASE QUANTITY
  const decreaseQuantity = useCallback((productId: number) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.product.id !== productId) return item;

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      })
    );
  }, []);

  // REMOVE PRODUCT
  const removeFromCart = useCallback((productId: number) => {
    setItems((previous) =>
      previous.filter(
        (item) => item.product.id !== productId
      )
    );
  }, []);

  // CLEAR CART
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // CART COUNT
  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // SUBTOTAL
  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.product.salePrice * item.quantity,
    0
  );

  // TOTAL
  const total =
    subtotal + (items.length > 0 ? deliveryFee : 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        deliveryFee,
        total,
        isHydrated,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
