
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Check,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Headphones,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
} from "lucide-react";

import type { Product } from "@/data/products";
import { useCart } from "@/app/context/cart-context";
import { formatAED } from "../../../lib/formate-price";

import ProductGallery from "./product-gallery";
import ProductCard from "../home/product-card";

const WHATSAPP_NUMBER = "971566323742";

type Props = {
  product: Product;
  images: string[];
  relatedProducts: Product[];
};

export default function ProductDetailsClient({
  product,
  images,
  relatedProducts,
}: Props) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const features = product.features ?? [
    "Premium Product Quality",
    "Easy Installation",
    "Customer Assistance Available",
  ];

  const description =
    product.description ??
    `Explore ${product.name}. Contact our team for complete product specifications and availability.`;

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in ${product.name}. Please share more details.`
  );

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const increase = () => {
    setQuantity((current) =>
      Math.min(current + 1, product.stock)
    );
  };

  const decrease = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] pb-16 text-[#17233d]">
      <div className="mx-auto max-w-[1450px] px-3 py-5 sm:px-5 lg:px-8 lg:py-8">

        {/* PRODUCT TOP SECTION */}
        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">

          {/* LEFT: PRODUCT IMAGE */}
          <div className="min-w-0">
            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
              <ProductGallery
                images={images}
                name={product.name}
              />
            </div>

            {/* SERVICE BENEFITS */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="flex min-h-[65px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2">
                <ShieldCheck className="shrink-0 text-blue-500" size={21} />
                <div>
                  <p className="text-[10px] font-bold sm:text-xs">
                    1 Year
                  </p>
                  <p className="text-[9px] text-gray-500 sm:text-[10px]">
                    Warranty
                  </p>
                </div>
              </div>

              <div className="flex min-h-[65px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2">
                <Truck className="shrink-0 text-orange-500" size={21} />
                <div>
                  <p className="text-[10px] font-bold sm:text-xs">
                    Fast Delivery
                  </p>
                  <p className="text-[9px] text-gray-500 sm:text-[10px]">
                    UAE Delivery
                  </p>
                </div>
              </div>

              <div className="flex min-h-[65px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2">
                <Headphones className="shrink-0 text-purple-500" size={21} />
                <div>
                  <p className="text-[10px] font-bold sm:text-xs">
                    24/7 Support
                  </p>
                  <p className="text-[9px] text-gray-500 sm:text-[10px]">
                    Customer Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFORMATION */}
          <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

            {/* CATEGORY */}
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
              <Link
                href="/products"
                className="hover:text-orange-500"
              >
                Products
              </Link>

              <ChevronRight size={13} />

              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="font-medium text-orange-600 hover:underline"
              >
                {product.category}
              </Link>
            </div>

            {/* NAME */}
            <h1 className="text-xl font-bold leading-tight text-[#17233d] sm:text-2xl lg:text-[27px]">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                dir="ltr"
                className="text-2xl font-bold text-[#ed6332] sm:text-3xl"
              >
                {formatAED(product.salePrice)}
              </span>

              {product.regularPrice > product.salePrice && (
                <>
                  <span
                    dir="ltr"
                    className="text-base text-gray-400 line-through"
                  >
                    {formatAED(product.regularPrice)}
                  </span>

                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-600">
                    Sale
                  </span>
                </>
              )}
            </div>

            {/* PRODUCT SPECIFICATIONS */}
            <div className="mt-6">
              <h2 className="mb-3 text-sm font-bold text-[#17233d]">
                Product Specifications
              </h2>

              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs leading-relaxed text-[#34435d]"
                  >
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0 text-green-500"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* WARRANTY NOTICE */}
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
              <ShieldCheck
                size={20}
                className="shrink-0 text-green-600"
              />

              <div>
                <p className="text-xs font-bold text-green-800">
                  Quality & Customer Support
                </p>
                <p className="mt-0.5 text-[10px] text-green-700">
                  Contact our team for product and activation assistance.
                </p>
              </div>
            </div>

            {/* QUANTITY AND BUTTONS */}
            <div className="mt-5 flex flex-wrap items-center gap-2">

              {/* QUANTITY */}
              <div className="flex h-11 items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
                <button
                  type="button"
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className="flex h-full w-9 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>

                <span className="w-9 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increase}
                  disabled={quantity >= product.stock}
                  className="flex h-full w-9 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#f16b32] px-4 text-xs font-bold text-white transition hover:bg-[#dc5724] disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-sm"
              >
                <ShoppingCart size={17} />
                {product.stock <= 0
                  ? "OUT OF STOCK"
                  : added
                    ? "ADDED TO CART"
                    : "ADD TO CART"}
              </button>

              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#249e55] px-4 text-xs font-bold text-white transition hover:bg-[#188746] sm:text-sm"
              >
                <MessageCircle size={17} />
                WHATSAPP
              </a>
            </div>

            {/* EXTRA ACTIONS */}
            <div className="mt-4 flex flex-wrap gap-5 text-[11px] text-gray-500">
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-red-500"
              >
                <Heart size={14} />
                Wishlist
              </button>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(
                      window.location.href
                    );
                  }
                }}
                className="flex items-center gap-1.5 hover:text-orange-500"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>

          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="mt-7 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 bg-gray-100 px-5 py-4">
            <h2 className="text-base font-bold text-[#17233d]">
              {product.name}
            </h2>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs leading-7 text-gray-600 sm:text-sm">
              {description}
            </p>

            <div className="mt-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#ed6332]">
                <Zap size={17} />
                KEY FEATURES
              </h3>

              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <Check
                      size={14}
                      className="shrink-0 text-orange-500"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT NOTICE */}
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
              <ShieldCheck
                size={23}
                className="shrink-0 text-orange-600"
              />

              <div>
                <p className="text-xs font-bold text-[#17233d]">
                  Product Support & Assistance
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-gray-600">
                  Please contact our support team if you need assistance
                  with your product.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT GALLERY */}
        <section className="mt-8">
          <h2 className="mb-4 text-base font-bold text-[#17233d]">
            Product Gallery
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white p-3"
              >
                <Image
                  src={image}
                  alt={`${product.name} gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain p-3 transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#17233d]">
                  Related Products
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  You may also like these products
                </p>
              </div>

              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700"
              >
                View All
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  variant="standard"
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
