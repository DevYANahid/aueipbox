
"use client";

import Image from "next/image";

import { Star } from "lucide-react";
import Link from "next/link";
import {
  MessageCircle,
  ShoppingCart,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

import type { Product } from "@/data/products";
import { formatAED } from "../../../lib/formate-price";

const WHATSAPP_NUMBER = "971566323742";
const SITE_URL = "https://aueipbox.vercel.app";



type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  variant?: "featured" | "compact" | "standard";
};

export default function ProductCard({
  product,
  onAddToCart,
  variant = "standard",
}: Props) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  const total = product.sold + product.stock;
 const reviewCount =
  100 + (Math.abs(Number(product.id) || 0) * 73) % 400;




  const soldPercentage =
    total > 0
      ? Math.min(100, (product.sold / total) * 100)
      : 0;

  const productLink = `${SITE_URL}/products/${product.slug}`;

  const message = encodeURIComponent(
    `Hello, I'm interested in this product:

Product: ${product.name}
Price: ${formatAED(product.salePrice)}
Link: ${productLink}

Can you provide more details?`
  );

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <article
      className={`
        group relative flex h-full min-w-0 overflow-hidden
        rounded-[18px] border border-purple-500/60
        bg-gradient-to-b from-[#17102f] via-[#0d1027] to-[#07091c]
        shadow-[0_0_12px_rgba(168,85,247,0.16)]
        transition-all duration-300
        hover:-translate-y-1 hover:border-fuchsia-400
        hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
        ${isCompact
          ? "flex-col lg:flex-row"
          : "flex-col"
        }
      `}
    >

      {/* TOP NEON LINE */}
      <div className="pointer-events-none absolute left-8 right-8 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_12px_#d946ef]" />

      {/* PRODUCT IMAGE */}
      <Link
        href={`/products/${product.slug}`}
        className={`
          relative block shrink-0 overflow-hidden
          bg-[radial-gradient(ellipse_at_center,rgba(126,34,206,0.25),transparent_75%)]
          ${isCompact
            ? "aspect-[5/3] w-full lg:aspect-auto lg:h-full lg:w-[48%]"
            : isFeatured
              ? "aspect-[4/3] w-full lg:aspect-auto lg:h-[48%]"
              : "aspect-[4/3] w-full"
          }
        `}
      >

       
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={product.id === 1}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="
            object-cover
            p-0
            transition-transform duration-500
            group-hover:scale-105
          "
        />


        {/* IMAGE GLOW */}
        <div className="pointer-events-none absolute bottom-2 left-1/4 right-1/4 h-4 rounded-full bg-fuchsia-500/40 blur-xl" />

        {/* HOT BADGE */}
        <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full border border-orange-300/30 bg-gradient-to-r from-orange-500 to-red-500 px-2.5 py-1 text-[10px] font-black text-white shadow-[0_0_12px_rgba(249,115,22,0.5)] sm:left-3 sm:top-3">
          <Flame size={12} />
          {product.badge || "HOT"}
        </span>

        {/* VIEW ICON */}
        {!isCompact && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        )}
      </Link>

      {/* PRODUCT INFORMATION */}
      <div
        className={`
          flex min-h-0 min-w-0 flex-1 flex-col
          text-center
          ${isCompact
            ? "p-2 sm:p-3 lg:justify-center lg:p-2.5"
            : isFeatured
              ? "p-3 sm:p-4 lg:justify-between"
              : "p-3 sm:p-4"
          }
        `}
      >

        {/* PRODUCT NAME */}
        <Link
          href={`/products/${product.slug}`}
          className="block min-w-0"
        >
          {/* STAR RATING */}
       
          <h3
            className={`
              line-clamp-2 font-extrabold leading-snug text-white
              transition-colors hover:text-fuchsia-300
              ${isCompact
                ? "text-xs sm:text-sm lg:text-[13px]"
                : isFeatured
                  ? "text-base sm:text-lg lg:text-xl"
                  : "text-sm sm:text-base"
              }
            `}
          >
            {product.name}
          </h3>
        </Link>
         <div className="my-2 flex items-center justify-center gap-1">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={17}
                fill="#facc15"
                className="text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]"
              />
            ))}
          </div>

          <span className="text-xs font-medium text-gray-300">
            ({reviewCount})
          </span>
        </div>

        {/* PRICE */}
        <div
          className={`
            flex min-w-0 flex-wrap items-center justify-center
            gap-2
            ${isCompact ? "my-2 lg:my-1.5" : "my-3"}
          `}
        >
          <span
            dir="ltr"
            className={`
              whitespace-nowrap font-black text-orange-400
              drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]
              ${isCompact
                ? "text-sm sm:text-base"
                : "text-lg sm:text-xl"
              }
            `}
          >
            {formatAED(product.salePrice)}
          </span>

          {product.regularPrice > product.salePrice && (
            <span
              dir="ltr"
              className={`
                whitespace-nowrap font-bold text-gray-400 line-through
                ${isCompact ? "text-[10px] sm:text-xs" : "text-sm"}
              `}
            >
              {formatAED(product.regularPrice)}
            </span>
          )}
        </div>

        {/* STOCK */}
        <div className="mb-2 mt-auto min-w-0">

          <div
            className={`
              mb-2 flex items-center justify-between gap-1
              font-medium text-gray-300
              ${isCompact ? "text-[10px] sm:text-xs" : "text-xs"}
            `}
          >
            <span className="truncate">
              Available: {product.stock}
            </span>

            <span className="shrink-0">
              Stock: {product.stock}
            </span>
          </div>

          {/* PROGRESS BAR */}
          <div
            className={`
              overflow-hidden rounded-full bg-white/15
              ${isCompact ? "h-1.5" : "h-2"}
            `}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-purple-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-500"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div
          className={`
            grid w-full min-w-0 grid-cols-2
            ${isCompact ? "gap-1.5 lg:gap-1.5" : "gap-2"}
          `}
        >

          {/* WHATSAPP */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Enquiry"
            className={`
              flex min-w-0 cursor-pointer items-center justify-center
              gap-1 overflow-hidden whitespace-nowrap rounded-full
              border border-green-300/40
              bg-gradient-to-r from-green-500 to-green-600
              font-extrabold text-white
              shadow-[0_0_12px_rgba(34,197,94,0.35)]
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_20px_rgba(34,197,94,0.65)]
              active:scale-95
              ${isCompact
                ? "px-1 py-2 text-[10px] sm:px-2 sm:text-xs lg:px-1 lg:py-2"
                : "px-2 py-3 text-[11px] sm:text-sm"
              }
            `}
          >
            <MessageCircle
              size={isCompact ? 14 : 17}
              className="shrink-0"
            />

            <span className="truncate">
              <span className="sm:hidden">Chat</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </span>
          </a>

          {/* ADD TO CART */}
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            disabled={!onAddToCart || product.stock <= 0}
            title="Add to Cart"
            className={`
              group/cart relative flex min-w-0 cursor-pointer
              items-center justify-center gap-1 overflow-hidden
              whitespace-nowrap rounded-full
              border border-fuchsia-300/70
              bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600
              font-extrabold text-white
              shadow-[0_0_12px_rgba(168,85,247,0.55)]
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-[0_0_20px_rgba(192,38,211,0.8)]
              active:scale-95
              disabled:cursor-not-allowed disabled:opacity-50
              ${isCompact
                ? "px-1 py-2 text-[10px] sm:px-2 sm:text-xs lg:px-1 lg:py-2"
                : "px-2 py-3 text-[11px] sm:text-sm"
              }
            `}
          >

            {/* BUTTON SHINE */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cart:translate-x-full" />

            <ShoppingCart
              size={isCompact ? 14 : 18}
              className="relative z-10 shrink-0"
            />

            <span className="relative z-10 truncate">
              {product.stock <= 0
                ? "Sold Out"
                : (
                  <>
                    <span className="sm:hidden">Cart</span>
                    <span className="hidden sm:inline">Add to Cart</span>
                  </>
                )}
            </span>

          </button>

        </div>
      </div>

      {/* BOTTOM GLOW */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-70 shadow-[0_0_12px_#d946ef]" />

    </article>
  );
}
