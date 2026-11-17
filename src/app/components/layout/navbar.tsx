
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import SearchBar from "../../components/layout/search-bar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "IPTV Box", href: "/uaeiptv" },
  { name: "IPTV SUBS", href: "/uaeiptv-sub" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090d20]/95 backdrop-blur-xl">

      {/* Main Navbar */}
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt="IPTV World Logo"
            width={180}
            height={55}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-300 lg:flex">

          <Link
            href="/"
            className="text-purple-400 transition hover:text-purple-300"
          >
            Home
          </Link>

         <Link href="/products">Shop</Link>


          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-purple-400"
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* Desktop Search */}
        <div className="hidden w-64 shrink-0 md:block">
          <SearchBar />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          className="flex items-center justify-center text-white transition hover:text-purple-400 lg:hidden"
        >
          {mobileMenuOpen ? (
            <X size={27} />
          ) : (
            <Menu size={27} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#090d20] px-5 pb-5 pt-4 lg:hidden">

          {/* Mobile Search */}
          <div className="mb-5 md:hidden">
            <SearchBar />
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-1">

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-purple-400 transition hover:bg-white/5"
            >
              Home
            </Link>

           <Link href="/products">Shop</Link>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-purple-400"
              >
                {link.name}
              </Link>
            ))}

          </nav>

        </div>
      )}

    </header>
  );
}
