import Image from "next/image";
import Container from "../components/layout/Container";
import Hero from "../components/sections/hero/Hero";
import FeaturedProducts from "../components/sections/featured/FeaturedProducts";

export default function Home() {
  return (
    <main>

      <Hero />
      
      <FeaturedProducts />

    </main>
  )
}