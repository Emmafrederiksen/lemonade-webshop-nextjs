import { Suspense } from "react";
import Hero from "../components/sections/hero/Hero";
import FeaturedProducts from "../components/sections/featured/FeaturedProducts";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

export default function Home() {
  return (
    <main>

      <Hero
        title="Fresh handmade lemonade"
        description="Crafted with real lemons and a touch of sweetness. Refreshing. Simple. Beautiful."
        image="/herobillede_LemonadeStand.png"
      />

      <Suspense fallback={
        <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      }>
        <FeaturedProducts />
      </Suspense>

    </main>
  )
}