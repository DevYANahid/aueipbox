
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatAED } from "../../../lib/formate-price";

const WHATSAPP_NUMBER = "0971566323742";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const total = product.sold + product.stock;

  const soldPercentage =
    total > 0 ? (product.sold / total) * 100 : 0;

  const message = encodeURIComponent(
    `Hello, I am interested in ${product.name}. Please share more details.`
  );

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-purple-500/30 bg-[#111832] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_12px_40px_rgba(124,58,237,0.2)]">

      {/* Full Width Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full overflow-hidden bg-white"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={product.id === 1}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-extrabold text-white ${
            product.badge === "HOT"
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
        >
          {product.badge}
        </span>

        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </Link>

      {/* Product Information */}
      <div className="p-4">

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-purple-400">
          {product.category}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="min-h-[42px] line-clamp-2 text-sm font-bold leading-5 text-white hover:text-purple-300">
            {product.name}
          </h3>
        </Link>

        {/* Prices */}
        <div className="my-4 flex flex-wrap items-center gap-2">
          <span dir="ltr" className="text-base font-extrabold text-red-400">
            {formatAED(product.salePrice)}
          </span>

          <span dir="ltr" className="text-xs text-gray-500 line-through">
            {formatAED(product.regularPrice)}
          </span>
        </div>

        {/* Sold and Stock */}
        <div className="mb-2 flex justify-between text-xs text-gray-400">
          <span>Sold: {product.sold}</span>
          <span>Stock: {product.stock}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-purple-500"
            style={{ width: `${soldPercentage}%` }}
          />
        </div>

        {/* WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-2.5 text-sm font-bold text-white transition hover:bg-green-600"
        >
          <MessageCircle size={18} />
          WhatsApp Enquiry
        </a>

      </div>
    </article>
  );
}
