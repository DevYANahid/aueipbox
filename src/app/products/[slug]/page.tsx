
import { notFound } from "next/navigation";

import {
  newArrivals,
  trendingProducts,
} from "@/data/products";

import ProductDetailsClient from "../../components/product/product-details-client";

const allProducts = [...newArrivals, ...trendingProducts];

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const product = allProducts.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.slug !== product.slug &&
        item.category === product.category
    )
    .filter(
      (item, index, self) =>
        self.findIndex((p) => p.slug === item.slug) === index
    )
    .slice(0, 8);

  const images = product.images?.length
    ? product.images
    : [product.image];

  return (
    <ProductDetailsClient
      product={product}
      images={images}
      relatedProducts={relatedProducts}
    />
  );
}
