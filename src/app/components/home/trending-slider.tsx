
"use client";

import ProductCard from "./product-card";
import type { Product } from "@/data/products";

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function TrendingSlider({
  products,
  onAddToCart,
}: Props) {
  if (!products || products.length === 0) return null;

  const middle = Math.ceil(products.length / 2);

  const firstRow = products.slice(0, middle);
  const secondRow = products.slice(middle);

  const renderRow = (
    rowProducts: Product[],
    direction: "left" | "right"
  ) => {
    if (!rowProducts.length) return null;

    return (
      <div className="trending-track">
        <div
          className={`trending-content ${
            direction === "left"
              ? "trending-left"
              : "trending-right"
          }`}
        >
          {/* Original products */}
          <div className="trending-group">
            {rowProducts.map((product) => (
              <div
                key={`original-${direction}-${product.id}`}
                className="trending-card"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  variant="standard"
                />
              </div>
            ))}
          </div>

          {/* Duplicate products for infinite sliding */}
          <div
            className="trending-group"
            aria-hidden="true"
          >
            {rowProducts.map((product) => (
              <div
                key={`duplicate-${direction}-${product.id}`}
                className="trending-card"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  variant="standard"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="trending-slider">
      {renderRow(firstRow, "left")}
      {renderRow(secondRow, "right")}
    </section>
  );
}
