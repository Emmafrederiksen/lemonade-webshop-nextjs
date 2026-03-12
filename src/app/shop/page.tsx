/*
|--------------------------------------------------------------------------
| "use client"
|--------------------------------------------------------------------------
| ShopPage bruger useState og useEffect, som er React hooks.
| Hooks må kun bruges i Client Components, derfor "use client" øverst.
|
*/

"use client"

import { useEffect, useState, useMemo } from "react"
import Hero from "@/components/sections/hero/Hero"
import FilterBar from "@/components/filterbar/FilterBar"
import ProductCard from "@/components/product/ProductCard"
import Container from "@/components/layout/Container"
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton"
import { Product } from "@/types/product"


export default function ShopPage() {


  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  | products  – alle produkter hentet fra API
  | sort      – hvilken sortering er valgt (default: billigst først)
  | filter    – hvilken flavour er valgt (default: alle)
  |
  */

  const [products, setProducts] = useState<Product[]>([])
  const [sort, setSort] = useState("price-low")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)


  /*
  |--------------------------------------------------------------------------
  | FETCH PRODUKTER
  |--------------------------------------------------------------------------
  | useEffect med tom array [] som dependency betyder:
  | kør denne kode én gang når siden loader — aldrig igen.
  |
  | Vi henter alle produkter fra vores API og gemmer dem i state.
  |
  */

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])


  /*
  |--------------------------------------------------------------------------
  | FILTRERING OG SORTERING
  |--------------------------------------------------------------------------
  | useMemo genberegner kun filtered når products, sort eller filter ændrer sig.
  |
  | Trin 1: Kopier products arrayet (vi må ikke mutere original state)
  | Trin 2: Filtrer på flavor hvis ikke "all" er valgt
  | Trin 3: Sortér efter den valgte sortering
  |
  */

  const filtered = useMemo(() => {

    // Trin 1: Kopier så vi ikke ændrer på den originale products state
    let result = [...products]

    // Trin 2: Filtrer
    if (filter !== "all") {
      result = result.filter(p => p.flavor === filter)
    }

    // Trin 3: Sortér
    if (sort === "price-low") result.sort((a, b) => a.price - b.price)
    if (sort === "price-high") result.sort((a, b) => b.price - a.price)
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name))

    return result

  }, [products, sort, filter])


  return (
    <main>

      <Hero
        title="Shop Our Lemonades"
        description={
          <>
            Discover all available flavors.
            <span className="block">Browse and add your favorites to cart.</span>
          </>
        }
        image="/shophero.png"
        showButtons={false}
      />


      {/*
      |--------------------------------------------------------------------------
      | FILTERBAR
      |--------------------------------------------------------------------------
      | Vi sender de nuværende værdier ned som options.
      | Vi sender setSort og setFilter ned som funktioner.
      |
      | Når brugeren vælger noget i FilterBar, kalder den fx onSortChange("price-high")
      | Det er det samme som at kalde setSort("price-high") her i ShopPage.
      | React opdaterer state → useMemo kører igen → filtered opdateres → siden re-renderer.
      |
      */}

      <FilterBar
        options={{ sort, filter }}
        onSortChange={setSort}
        onFilterChange={setFilter}
      />


      {/*
      |--------------------------------------------------------------------------
      | PRODUKTGRID
      |--------------------------------------------------------------------------
      | Vi mapper over filtered (ikke products) så vi altid viser
      | de sorterede og filtrerede produkter.
      |
      */}

      <Container>
       
        {/* Produktgrid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">

          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : filtered.map(product => (
                <ProductCard key={product.product_id} product={product} />
              ))
          }

        </div>
      </Container>
      

    </main>
  )
}