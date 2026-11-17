
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const slides = [
  {
    image: "/images/slider1.jpeg",
    label: "NEXT LEVEL ENTERTAINMENT",
    title: "IPTV Box &",
    highlight: "Subscriptions",
    description:
      "Enjoy 25,000+ Live TV Channels, Movies, Series and More Worldwide.",
  },
  {
    image: "/images/slider2.jpeg",
    label: "PREMIUM STREAMING EXPERIENCE",
    title: "Entertainment",
    highlight: "Without Limits",
    description:
      "Discover premium entertainment and your favourite channels.",
  },
  {
    image: "/images/slider1.jpeg",
    label: "SMART ENTERTAINMENT",
    title: "Upgrade Your",
    highlight: "TV Experience",
    description:
      "Explore our latest IPTV boxes and subscription plans.",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActive((current) =>
      (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative mx-auto max-w-[1440px] px-4 pt-4">

      <div className="relative min-h-[390px] md:min-h-[430px] overflow-hidden rounded-3xl border border-purple-500/30 bg-[#101b4a]">

        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fill
          priority={active === 0}
          className="object-cover transition-opacity duration-700"
          sizes="(max-width: 968px) 100vw, 1440px"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080d29]/95 via-[#10184a]/75 to-transparent" />

        <div className="relative z-10 flex min-h-[390px] md:min-h-[430px] items-center px-7 py-10 md:px-16">

          <div className="max-w-xl text-white">

            <span className="inline-block rounded-full bg-purple-600 px-4 py-1.5 text-xs md:text-sm font-bold tracking-wide">
              {slide.label}
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.08]">
              {slide.title}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base md:text-xl leading-relaxed text-gray-200">
              {slide.description}
            </p>

            <a
              href="https://wa.me/971XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-green-500 px-7 py-3.5 font-bold text-white transition hover:bg-green-600"
            >
              <MessageCircle size={21} />
              Contact on WhatsApp
              <ChevronRight size={19} />
            </a>

          </div>
        </div>

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-purple-600"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-purple-600"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((item, index) => (
            <button
              key={item.image}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                active === index
                  ? "w-8 bg-purple-500"
                  : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
