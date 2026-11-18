
import type { Metadata } from "next";
import "./globals.css";

import Topbar from "./components/layout/topbar";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import { CartProvider } from "./context/cart-context";

export const metadata: Metadata = {
  title: "UAE IPTV Box | Premium IPTV Solutions",
  description:
    "Explore premium IPTV boxes and IPTV subscriptions in UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CartProvider>
          <Topbar />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
