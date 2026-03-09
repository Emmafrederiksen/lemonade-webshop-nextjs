import Hero from "@/components/sections/hero/Hero";

export default function Home() {
  return (
    <main>

      <Hero
        title="Shop Our Lemonades"
        description={
         <>
            Discover all available flavors.
            <span className="block">
            Browse and add your favorites to cart.
            </span>
        </>
        }
        image="/shophero.png"
        showButtons={false}
      />


    </main>
  )
}