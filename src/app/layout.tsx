import type { Metadata } from "next";
import { CartProvider } from "../context/CartContext";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SlideCart from "@/components/slidecart/SlideCart";


import { DM_Serif_Display, DM_Sans } from "next/font/google"

import "./globals.css";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Lemonade Stand",
  description: "A refreshing online store for all your lemonade needs! Explore our wide selection of delicious lemonades, from classic to exotic flavors. Quench your thirst with our high-quality ingredients and enjoy the perfect blend of sweet and tangy. Whether you're looking for a quick pick-me-up or a delightful treat, Lemonade Stand has you covered. Shop now and experience the zest of summer in every sip!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <SlideCart />
        </CartProvider>
      </body>
    </html>
  )
}