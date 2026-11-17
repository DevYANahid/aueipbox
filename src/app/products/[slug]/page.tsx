
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import {
  newArrivals,
  trendingProducts,
} from "@/data/products";

import { formatAED } from "../../../lib/formate-price";
import ProductGallery from "../../components/product/product-gallery";

const WHATSAPP_NUMBER = "0971566323742";

const allProducts = [...newArrivals, ...trendingProducts];

type Props = {
  params: Promise<{ slug: string }>;
};

async function ProductDetailsContent({ params }: Props) {
  const { slug } = await params;

  const product = allProducts.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const images = product.images?.length
    ? product.images
    : [product.image];

  const features = product.features ?? [
    "Premium Product Quality",
    "Customer Assistance Available",
    "Contact Us For More Information",
  ];

  const description =
    product.description ??
    `Explore our ${product.name}. Contact our team through WhatsApp for complete product specifications, compatibility information and availability.`;

  const message = encodeURIComponent(
    `Hello, I am interested in ${product.name}. Please share more details.`
  );

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <main className="min-h-screen bg-white text-[#17233d]">
      <section className="mx-auto max-w-[1600px] px-4 pt-5 md:px-8 md:pt-8">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8">

          {/* Product Gallery */}
          <div className="w-full min-w-0">
            <ProductGallery
              images={images}
              name={product.name}
            />
          </div>

          {/* Product Information */}
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-1 text-sm">
              <span className="text-gray-500">
                Categories:
              </span>

              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="font-medium text-red-500 hover:underline"
              >
                {product.category}
              </Link>
            </div>

            <h1 className="text-2xl font-semibold leading-snug text-[#17233d] md:text-3xl">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                dir="ltr"
                className="text-3xl font-medium text-orange-500"
              >
                {formatAED(product.salePrice)}
              </span>

              <span
                dir="ltr"
                className="text-base text-gray-500 line-through"
              >
                {formatAED(product.regularPrice)}
              </span>
            </div>

            {/* Features */}
            <div className="mt-7">
              <h2 className="mb-3 text-lg font-semibold">
                About this item
              </h2>

              <ul className="space-y-1.5 text-sm leading-relaxed text-[#34435d]">
                {features.map((feature, index) => (
                  <li key={index} className="flex gap-1.5">
                    <span>•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp */}
            <div className="mt-7">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#459d70] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#35875d]"
              >
                <MessageCircle size={18} />
                Whatsapp Now
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mt-8 overflow-hidden rounded-md border border-[#d1d5db] md:mt-10">
          <div className="bg-[#e5e7eb] px-4 py-3">
            <h2 className="text-lg font-medium text-red-600">
              Description
            </h2>
          </div>

          <div className="space-y-5 p-5 text-sm leading-7 text-[#34435d] md:p-6">
            <p>{description}</p>

            <div>
              <h3 className="mb-2 font-semibold text-[#17233d]">
                Key Features
              </h3>

              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index}>
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default function ProductDetails({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white p-10 text-center text-gray-500">
          Loading product details...
        </div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
