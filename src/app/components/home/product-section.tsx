
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  Check,
  Crown,
  Flame,
} from "lucide-react";

import ProductCard from "./product-card";
import type { Product } from "@/data/products";

type Props = {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllLink: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default function ProductSection({
  title,
  subtitle,
  products,
  viewAllLink,
}: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [added, setAdded] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return;

    setCartItems((previous) => {
      const existing = previous.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { product, quantity: 1 }];
    });

    setAdded(product.id);

    setTimeout(() => {
      setAdded((current) =>
        current === product.id ? null : current
      );
    }, 1500);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Featured products
  const featuredProducts = products.slice(0, 6);

  // Remaining products
  const remainingProducts = products.slice(6);

  // Exact layout positions
  const positions = [
    "lg:col-start-1 lg:row-start-1 lg:row-span-2",
    "lg:col-start-2 lg:row-start-1",
    "lg:col-start-2 lg:row-start-2",
    "lg:col-start-3 lg:row-start-1 lg:row-span-2",
    "lg:col-start-4 lg:row-start-1",
    "lg:col-start-4 lg:row-start-2",
  ];

  return (
    <section className="relative mx-auto max-w-[1440px] overflow-hidden px-4 py-10 sm:px-5">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Section Header */}
      <div className="relative mb-7 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 items-center rounded-full border border-fuchsia-400/60 bg-gradient-to-r from-orange-500/20 via-purple-700/30 to-fuchsia-600/20 px-4 shadow-[0_0_20px_rgba(168,85,247,0.35)]">

            <Flame size={23} className="text-orange-400" />

            <h2 className="ml-2 text-xl font-black text-white sm:text-2xl">
              Hot Deals
            </h2>

          </div>

          <div className="hidden h-10 w-[2px] bg-purple-500 sm:block" />

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <Crown size={23} className="text-fuchsia-500" />

              <h3 className="text-xl font-extrabold text-white">
                {title}
              </h3>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              {subtitle}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          {/* Cart */}
          <div className="flex items-center gap-2 rounded-full border border-purple-500/50 bg-[#160c30] px-4 py-2.5 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <ShoppingCart size={19} className="text-fuchsia-400" />

            <span className="text-sm font-bold">
              {cartCount}
            </span>
          </div>

          {/* View All */}
          <Link
            href={viewAllLink}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-purple-400/50 bg-[#11102b] px-5 py-2.5 text-sm font-bold text-white transition-all hover:border-fuchsia-400 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            View All
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

      {/* Mobile Subtitle */}
      <div className="mb-5 sm:hidden">
        <h3 className="text-lg font-extrabold text-white">
          {title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          {subtitle}
        </p>
      </div>

      {/* Added Message */}
      {added !== null && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400">
          <Check size={18} />
          Product added to cart successfully!
        </div>
      )}

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:auto-rows-[250px] lg:grid-cols-4 lg:gap-3 xl:gap-4">

          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`min-w-0 ${
                positions[index]
              }`}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                variant={
                  index === 0 || index === 3
                    ? "featured"
                    : "compact"
                }
              />
            </div>
          ))}

        </div>
      )}

      {/* MORE PRODUCTS */}
      {remainingProducts.length > 0 && (
        <div className="mt-12">

          <div className="mb-6 flex items-center gap-3">

            <Flame size={23} className="text-orange-400" />

            <h3 className="text-xl font-extrabold text-white">
              More Products
            </h3>

            <div className="h-[2px] flex-1 bg-gradient-to-r from-purple-500 to-transparent" />

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">

            {remainingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                variant="standard"
              />
            ))}

          </div>

        </div>
      )}

    </section>
  );
}
