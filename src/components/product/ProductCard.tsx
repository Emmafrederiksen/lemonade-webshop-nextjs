"use client"

import Image from "next/image"
import { useCart } from "@/context/CartContext"

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Product = {
  product_id: number
  name: string
  description: string
  price: number
  image: string
}

type Props = {
  product: Product
}


export default function ProductCard(props: Props) {

  /*
  |--------------------------------------------------------------------------
  | CART
  |--------------------------------------------------------------------------
  | Vi henter addToCart og openCart fra CartContext.
  | addToCart tilføjer produktet til kurven.
  | openCart åbner slidecart'en så brugeren kan se det er tilføjet.
  |
  */

  const { addToCart, openCart } = useCart()


  /*
  |--------------------------------------------------------------------------
  | FUNCTION: handleAddToCart
  |--------------------------------------------------------------------------
  | Kaldes når brugeren klikker "Add to Cart".
  |
  | Vi pakker produktet ind i det format CartItem forventer
  | og kalder addToCart + openCart bagefter.
  |
  */

  function handleAddToCart() {
    addToCart({
      product_id: props.product.product_id,
      name: props.product.name,
      price: props.product.price,
      image: props.product.image,
      quantity: 1,
    })
    openCart()
  }


  return (

    <div className="bg-surface-slidecart rounded-card shadow-card p-4 flex flex-col h-full transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="bg-cardGradient rounded-xl flex justify-center">
        <Image
          src={`/${props.product.image}`}
          alt={props.product.name}
          width={250}
          height={250}
        />
      </div>

      <div className="mt-5 flex justify-between items-center">

        <h3 className="font-heading text-heading-md text-brand-textDark">
          {props.product.name}
        </h3>

        <span className="font-heading text-heading-md text-brand-textDark">
          ${Number(props.product.price).toFixed(2)}
        </span>

      </div>

      <p className="text-body text-brand-textDark mt-4 mb-6">
        {props.product.description}
      </p>

      {/*
      |--------------------------------------------------------------------------
      | ADD TO CART KNAP
      |--------------------------------------------------------------------------
      | onClick kalder handleAddToCart som tilføjer produktet
      | og åbner slidecart'en automatisk.
      |
      */}

      <button
        onClick={handleAddToCart}
        className="mt-auto bg-brand-primary text-brand-textLight py-2 rounded-full hover:brightness-105 transition"
      >
        Add to Cart
      </button>

    </div>

  )
}