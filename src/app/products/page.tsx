
import { Suspense } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

import {
  newArrivals,
  trendingProducts,
} from "@/data/products";

import ProductCard from "../components/home/product-card";

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
};

async function ProductsContent({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search?.trim() || "";
  const category = params.category || "";
  const sort = params.sort || "newest";

  // Combine products and remove duplicates
  const allProducts = Array.from(
    new Map(
      [...newArrivals, ...trendingProducts].map((product) => [
        product.slug,
        product,
      ])
    ).values()
  );

  // Available categories
  const categories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  // Search filtering
  let filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category ||
      product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.salePrice - b.salePrice);
  } else if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.salePrice - a.salePrice);
  } else if (sort === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return (
    <main className="min-h-screen bg-[#090d20] text-white">

      {/* Page Header */}
      <section className="border-b border-white/10 bg-[#111832]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 md:py-14">

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
            Explore Our Collection
          </p>

          <h1 className="text-3xl font-extrabold md:text-4xl">
            {search ? "Search Results" : "All Products"}
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Discover premium IPTV boxes and subscriptions.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-purple-400">
              Home
            </Link>
            <span>/</span>
            <span className="text-purple-400">Products</span>
          </div>

        </div>
      </section>

      {/* Products Section */}
      <section className="mx-auto max-w-[1440px] px-5 py-10">

        {/* Filter Toolbar */}
        <form
          action="/products"
          method="GET"
          className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111832] p-4 md:flex-row md:items-center md:justify-between"
        >

          {search && (
            <input type="hidden" name="search" value={search} />
          )}

          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal size={18} className="text-purple-400" />
            Filter Products
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex">

            <select
              name="category"
              defaultValue={category}
              className="min-w-0 rounded-lg border border-white/10 bg-[#090d20] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            >
              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="sort"
              defaultValue={sort}
              className="min-w-0 rounded-lg border border-white/10 bg-[#090d20] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
            >
              Apply Filters
            </button>

          </div>
        </form>

        {/* Results Information */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-xl font-bold">
              {category || "Our Products"}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Showing {filteredProducts.length} products
              {search ? ` for "${search}"` : ""}
            </p>
          </div>

          {(search || category || sort !== "newest") && (
            <Link
              href="/products"
              className="text-sm font-semibold text-purple-400 hover:text-purple-300"
            >
              Clear Filters
            </Link>
          )}

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}

          </div>
        ) : (

          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#111832] px-5 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
              <Search size={30} className="text-purple-400" />
            </div>

            <h3 className="text-xl font-bold">
              No Products Found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-400">
              We couldn't find any products matching your search.
              Try another keyword or category.
            </p>

            <Link
              href="/products"
              className="mt-6 rounded-full bg-purple-600 px-6 py-3 text-sm font-bold hover:bg-purple-700"
            >
              View All Products
            </Link>

          </div>

        )}

      </section>
    </main>
  );
}

export default function ProductsPage({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090d20] p-10 text-center text-white">
          Loading products...
        </div>
      }
    >
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}
