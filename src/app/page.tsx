
import Topbar from "./components/layout/topbar";
import Navbar from "./components/layout/navbar";
import HeroSlider from "./components/home/hero-slider";
import Footer from "./components/layout/footer";
import ProductSection from "./components/home/product-section";

import {
  newArrivals,
  trendingProducts,
} from "@/data/products";

import {
  Zap,
  ShieldCheck,
  Headphones,
  Gem,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Get started right away",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "Quality service",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    description: "Best viewing experience",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080d20]">


      <HeroSlider />

      {/* Benefits */}
      <section className="mx-auto max-w-[1440px] px-5 py-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-[#17183b] to-[#111a38] p-5 lg:grid-cols-4">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 p-2"
              >
                <Icon
                  size={32}
                  className="shrink-0 text-purple-400"
                />

                <div>
                  <h3 className="text-sm font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* New Arrivals */}
      <ProductSection
        title="New Arrivals"
        subtitle="Discover our latest IPTV boxes and subscriptions"
        products={newArrivals}
        viewAllLink="/products?type=new"
      />

      {/* Trending Products */}
      <ProductSection
        title="Trending Products"
        subtitle="Explore our most popular products"
        products={trendingProducts}
        viewAllLink="/products?type=trending"
      />
    </main>
  );
}
