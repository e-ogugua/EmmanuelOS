import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Zereth Foods — Cakes",
  description: "Beautiful custom cakes. Order online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body>
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="container py-4 flex items-center justify-between">
            <a className="flex items-center gap-3" href="/">
              <span className="text-2xl font-serif">Zereth Foods</span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="/gallery" className="hover:text-gold">Gallery</a>
              <a href="/order" className="hover:text-gold">Order</a>
              <a href="/contact" className="hover:text-gold">Contact</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t mt-16">
          <div className="container py-8 text-sm text-center">
            © {new Date().getFullYear()} Zereth Foods · Crafted with love
          </div>
        </footer>
      </body>
    </html>
  );
}
