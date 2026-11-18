
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Play,
  Zap,
} from "lucide-react";

const slides = [
  {
    image: "/Images/slider1.jpeg",
    label: "NEXT LEVEL ENTERTAINMENT",
    title: "IPTV Box &",
    highlight: "Subscriptions",
    description:
      "Enjoy 25,000+ Live TV Channels, Movies, Series and More Worldwide.",
  },
  {
    image: "/Images/slider2.jpeg",
    label: "PREMIUM STREAMING EXPERIENCE",
    title: "Entertainment",
    highlight: "Without Limits",
    description:
      "Discover premium entertainment and your favourite channels.",
  },
  {
    image: "/Images/slider1.jpeg",
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
    setActive(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[active];

  return (
    <section className="hero-section relative mx-auto max-w-[1440px] px-4 pt-4">
      <div className="hero-banner relative min-h-[390px] overflow-hidden rounded-3xl border border-purple-500/40 bg-[#080d29] shadow-[0_0_35px_rgba(124,58,237,0.15)] md:min-h-[460px]">

        {/* Background Image */}
        <div key={active} className="hero-image-wrapper absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={active === 0}
            sizes="(max-width: 968px) 100vw, 1440px"
            className="hero-background-image object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="hero-dark-overlay absolute inset-0" />

        {/* Animated Gradient */}
        <div className="hero-animated-gradient absolute inset-0" />

        {/* Moving Light Sweep */}
        <div className="hero-light-sweep" />

        {/* Orbit / Ring Effects */}
        <div className="hero-orbit hero-orbit-one">
          <span />
        </div>

        <div className="hero-orbit hero-orbit-two">
          <span />
        </div>

        <div className="hero-orbit hero-orbit-three">
          <span />
        </div>

        {/* Floating Particles */}
        <div className="hero-particles">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        {/* Animated Equalizer */}
        <div className="hero-equalizer">
          {Array.from({ length: 22 }).map((_, index) => (
            <span
              key={index}
              style={{
                animationDelay: `${index * 0.08}s`,
                height: `${12 + ((index * 17) % 35)}px`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          key={`content-${active}`}
          className="hero-content relative z-10 flex min-h-[390px] items-center px-7 py-10 md:min-h-[460px] md:px-16"
        >
          <div className="max-w-xl text-white">

            <span className="hero-label inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-600/80 px-4 py-2 text-xs font-bold tracking-wider backdrop-blur-md md:text-sm">
              <Zap size={15} />
              {slide.label}
            </span>

            <h1 className="hero-heading mt-5 text-4xl font-extrabold leading-[1.08] md:text-6xl">
              {slide.title}

              <span className="hero-highlight block bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            <p className="hero-description mt-5 max-w-md text-base leading-relaxed text-gray-200 md:text-xl">
              {slide.description}
            </p>

            <a
              href="https://wa.me/971566323742"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta mt-7 inline-flex items-center gap-3 rounded-full border border-green-300/30 bg-green-500 px-7 py-3.5 font-bold text-white shadow-[0_0_25px_rgba(34,197,94,0.35)] transition hover:scale-105 hover:bg-green-600"
            >
              <MessageCircle size={21} />
              Contact on WhatsApp
              <ChevronRight size={19} />
            </a>

          </div>
        </div>

        {/* Floating Play Icon */}
        <div className="hero-floating-play">
          <div className="hero-play-inner">
            <Play size={28} fill="currentColor" />
          </div>
        </div>

        {/* Previous */}
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="hero-arrow absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-purple-600"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="hero-arrow absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-purple-600"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                active === index
                  ? "w-9 bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                  : "w-2.5 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Bottom Neon Line */}
        <div className="hero-bottom-line" />

      </div>
    </section>
  );
}
