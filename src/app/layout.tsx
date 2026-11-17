
import type { Metadata } from "next";

import "./globals.css";

import Topbar from "./components/layout/topbar";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

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

        <Topbar />
        <Navbar />

        {children}

        <Footer />

      </body>
    </html>
  );
}
