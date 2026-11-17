
import { newArrivals, trendingProducts } from "@/data/products";
import ProductCard from "../components/home/product-card";

export default function UAEIPTVSubscriptionPage() {
  const products = [
    ...newArrivals,
    ...trendingProducts,
  ].filter(
    (product, index, self) =>
      index === self.findIndex((item) => item.id === product.id)
  );

  const filteredProducts = products.filter(
    (product) => product.category === "UAE IPTV Subscription"
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          UAE IPTV Subscription
        </h1>

        <p className="mt-3 text-gray-500">
          Explore our UAE IPTV subscription plans.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-16 text-center text-gray-500">
            No UAE IPTV subscriptions found.
          </p>
        )}
      </div>
    </main>
  );
}
