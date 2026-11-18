
"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";

import SearchBar from "./search-bar";
import { useCart } from "@/app/context/cart-context";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "IPTV Box", href: "/uaeiptv" },
  { name: "IPTV SUBS", href: "/uaeiptv-sub" },
  { name: "Contact", href: "/contact" },
];

// Navbar Content
function NavbarContent() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared Cart
  const { cartCount } = useCart();

  // Active Link Checker
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Desktop Link Styling
  const linkClass = (href: string) =>
    `relative py-2 text-sm font-semibold transition duration-200 ${
      isActive(href)
        ? "text-purple-400"
        : "text-gray-300 hover:text-purple-400"
    }`;

  // Close Mobile Menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090d20]/95 backdrop-blur-xl">

      {/* Main Navbar */}
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={closeMobileMenu}
        >
          <Image
            src="/Images/logo.png"
            alt="IPTV World Logo"
            width={180}
            height={55}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={linkClass(link.href)}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute -bottom-[19px] left-0 h-[3px] w-full rounded-full bg-purple-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <div className="hidden w-64 shrink-0 md:block">
          <SearchBar />
        </div>

        {/* Cart + Mobile Menu */}
        <div className="flex shrink-0 items-center gap-4">

          {/* CART ICON */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
              pathname === "/cart"
                ? "border-purple-400 bg-purple-500/20 text-purple-300"
                : "border-white/10 bg-white/5 text-gray-200 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
            }`}
          >
            <ShoppingCart
              size={21}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {/* DYNAMIC CART BADGE */}
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#090d20] bg-gradient-to-r from-fuchsia-500 to-purple-600 px-1 text-[10px] font-black text-white shadow-[0_0_10px_rgba(217,70,239,0.6)]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? "Close navigation" : "Open navigation"
            }
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "bg-purple-500/10 text-purple-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-purple-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Cart Link */}
          <Link
            href="/cart"
            onClick={closeMobileMenu}
            className="mt-3 flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm font-bold text-purple-300"
          >
            <span className="flex items-center gap-3">
              <ShoppingCart size={19} />
              Shopping Cart
            </span>

            <span className="rounded-full bg-purple-600 px-2.5 py-1 text-xs font-black text-white">
              {cartCount}
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}

// Main Navbar with Suspense
export default function Navbar() {
  return (
    <Suspense
      fallback={
        <div className="h-[76px] w-full bg-[#090d20]" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
