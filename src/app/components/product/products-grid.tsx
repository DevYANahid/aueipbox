
"use client";

import { useState } from "react";

import ProductCard from "../home/product-card";
import type { Product } from "@/data/products";
import { useCart } from "@/app/context/cart-context";
import { Check } from "lucide-react";

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) return;

    addToCart(product);
    setAdded(product.id);

    setTimeout(() => {
      setAdded((current) =>
        current === product.id ? null : current
      );
    }, 1500);
  };

  return (
    <>
      {added !== null && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400">
          <Check size={18} />
          Product added to cart successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            variant="standard"
          />
        ))}
      </div>
    </>
  );
}
