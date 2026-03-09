import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";


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
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
