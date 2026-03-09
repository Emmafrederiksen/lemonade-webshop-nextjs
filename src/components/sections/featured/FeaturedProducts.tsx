import Container from "@/components/layout/Container"
import ProductCard from "@/components/product/ProductCard"

async function getFeaturedProducts() {

  const res = await fetch("http://localhost:3001/products/featured", {
    cache: "no-store",
  })

  return res.json()
}

export default async function FeaturedProducts() {

  const products = await getFeaturedProducts()

  return (

    <section className="py-20 bg-white">

      <Container>

        <div className="flex justify-between items-center mb-10">

          <h2 className="font-heading text-heading-lg text-brand-textDark">
            Featured Lemonades
          </h2>

          <a href="/shop" className="text-brand-textDark hover:underline">
            View All
          </a>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      </Container>

    </section>

  )
}