import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

import Navbar from "../components/layout/Navbar";


// Import fonts
import { DM_Serif_Display, DM_Sans } from "next/font/google"


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
  description: "Fresh handmade lemonade webshop",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        <CartProvider>

          <Navbar />

          {children}
          
        </CartProvider>
      </body>
    </html>
  );
}
