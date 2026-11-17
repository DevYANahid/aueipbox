
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex w-full items-center overflow-hidden rounded-full border border-gray-200 bg-white transition focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100"
    >
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search IPTV boxes and subscriptions..."
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="px-2 text-gray-400 hover:text-gray-700"
        >
          <X size={17} />
        </button>
      )}

      <button
        type="submit"
        aria-label="Search"
        className="flex h-11 w-12 shrink-0 items-center justify-center bg-purple-600 text-white transition hover:bg-purple-700"
      >
        <Search size={19} />
      </button>
    </form>
  );
}
