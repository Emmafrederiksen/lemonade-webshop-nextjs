import Hero from "../components/sections/hero/Hero";
import FeaturedProducts from "../components/sections/featured/FeaturedProducts";

export default function Home() {
  return (
    <main>

      <Hero
        title="Fresh handmade lemonade"
        description="Crafted with real lemons and a touch of sweetness. Refreshing. Simple. Beautiful."
        image="/herobillede_LemonadeStand.png"
      />

      <FeaturedProducts />

    </main>
  )
}