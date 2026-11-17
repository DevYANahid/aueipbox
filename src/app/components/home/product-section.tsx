
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./product-card";
import type { Product } from "@/data/products";

type Props = {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllLink: string;
};

export default function ProductSection({
  title,
  subtitle,
  products,
  viewAllLink,
}: Props) {
  return (
    <section className="max-w-[1440px] mx-auto px-5 py-8">

      {/* Section Heading */}
      <div className="mb-6 flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">
          <div className="h-12 w-1.5 rounded-full bg-gradient-to-b from-purple-400 to-blue-500" />

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>

        <Link
          href={viewAllLink}
          className="hidden sm:flex items-center gap-2 rounded-full border border-purple-500/50 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600"
        >
          View All
          <ArrowRight size={17} />
        </Link>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-5 sm:hidden">
        <Link
          href={viewAllLink}
          className="flex items-center justify-center gap-2 rounded-full border border-purple-500/50 px-5 py-3 text-sm font-semibold text-white"
        >
          View All Products
          <ArrowRight size={17} />
        </Link>
      </div>

    </section>
  );
}
