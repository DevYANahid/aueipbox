
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const WHATSAPP_NUMBER = "971971566323742";

const footerGroups = [
  {
    title: "Get Help",
    links: [
      { name: "Privacy Notice", href: "/privacy-policy" },
      { name: "Delivery Information", href: "/delivery-information" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Shop", href: "/products" },
      { name: "IPTV Box", href: "/products?category=IPTV%20Box" },
      { name: "TV Subs", href: "/products?category=TV%20Subs" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#eeeeee] text-[#24334c]">

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-9 px-6 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1.2fr] lg:gap-10">

        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/Images/logo.png"
              alt="UAE IPTV Box"
              width={210}
              height={75}
              className="h-[58px] w-auto object-contain object-left"
            />
          </Link>

          <p className="mt-3 max-w-[300px] text-[12px] leading-[1.8] text-[#526078]">
            Offers IPTV boxes and TV subscriptions with
            global access, crystal-clear streaming, and
            24/7 expert support-your gateway to
            non-stop entertainment.
          </p>
        </div>

        {/* Footer Groups */}
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-5 text-[15px] font-semibold text-[#172b49]">
              {group.title}
            </h3>

            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-[#526078] transition-colors hover:text-orange-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-[15px] font-semibold text-[#172b49]">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#718096]" />
              <span className="text-[12px] leading-5 text-[#526078]">
                Dragon Mart, Dubai, UAE
              </span>
            </div>

            <a
              href="https://wa.me/971971566323742"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[12px] text-[#526078] transition hover:text-green-600"
            >
              <Phone size={15} className="shrink-0 text-[#718096]" />
              +971566323742
            </a>

            <a
              href="mailto:uaeiptvbox@gmail.com"
              className="flex items-center gap-3 text-[12px] text-[#526078] transition hover:text-orange-500"
            >
              <Mail size={15} className="shrink-0 text-[#718096]" />
              uaeiptvbox@gmail.com
            </a>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-[#d1d5db]">
        <div className="mx-auto max-w-[1440px] px-5 py-4 text-center">
          <p className="text-[11px] tracking-wide text-[#64748b]">
            UAE IPTV BOX © 2026. All right reserved
          </p>
        </div>
      </div>

    </footer>
  );
}
