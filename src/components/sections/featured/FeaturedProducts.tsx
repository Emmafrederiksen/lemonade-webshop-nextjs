import Container from "@/components/layout/Container"
import ProductCard from "@/components/product/ProductCard"
import Link from "next/link"
import { Product } from "@/types/product"

async function getFeaturedProducts() {

  const res = await fetch("http://localhost:3000/api/products/featured", {
    cache: "no-store",
  })

  return res.json()

}

export default async function FeaturedProducts() {

  const products = await getFeaturedProducts()

  return (

    <section id="featured" className="py-20 bg-white">

      <Container>

        <div className="flex md:grid md:grid-cols-3 items-center mb-10">

            {/* Venstre kolonne */}
            <div className="hidden md:block"></div>

            {/* Titel */}
            <div className="flex items-center gap-4 md:justify-center">

                <div className="hidden md:block w-16 h-[2px] bg-brand-textDark/30"></div>

                <h2 className="font-heading text-heading-lg text-brand-textDark whitespace-nowrap">
                Featured Lemonades
                </h2>

                <div className="hidden md:block w-16 h-[2px] bg-brand-textDark/30"></div>

            </div>

            {/* View all */}
            <div className="ml-auto md:ml-0 md:flex md:justify-end">
              <Link href="/shop" className="text-brand-textDark hover:underline">View All</Link>
            </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product: Product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}

        </div>

      </Container>

    </section>

  )
}