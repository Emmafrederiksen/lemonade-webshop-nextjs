"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import ConfirmDialog from "@/components/confirmdialog/ConfirmDialog"

export default function SlideCart() {

  /*
  |--------------------------------------------------------------------------
  | CART DATA
  |--------------------------------------------------------------------------
  | Vi henter alt vi skal bruge fra CartContext via useCart().
  |
  */

  const { cart, isOpen, closeCart, removeFromCart, updateQuantity } = useCart()


  /*
  |--------------------------------------------------------------------------
  | CONFIRM DIALOG STATE
  |--------------------------------------------------------------------------
  | confirmItem → product_id på det produkt der skal slettes (null = ingen dialog)
  | confirmName → produktnavn der vises i dialogen
  |
  */

  const [confirmItem, setConfirmItem] = useState<number | null>(null)
  const [confirmName, setConfirmName] = useState("")

  /*
  |--------------------------------------------------------------------------
  | MOUNTED CHECK
  |--------------------------------------------------------------------------
  | Forhindrer hydration fejl fordi localStorage ikke findes på serveren.
  | Vi venter med at rendere indtil komponenten er mounted i browseren.
  |
  */
 
  const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null


  /*
  |--------------------------------------------------------------------------
  | BEREGNINGER
  |--------------------------------------------------------------------------
  | subtotal  → sum af alle produkter (pris × antal)
  | delivery  → gratis ved $15, ellers fast $3 gebyr
  | total     → subtotal + delivery
  |
  */

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal >= 15 ? 0 : 3
  const total = subtotal + delivery


  return (

    <>

      {/*
      |--------------------------------------------------------------------------
      | OVERLAY
      |--------------------------------------------------------------------------
      | Mørk baggrund bag slidecart.
      | Klik på den lukker cart.
      | pointer-events-none når cart er lukket så man kan klikke på siden bagved.
      |
      */}

      <div
        onClick={closeCart}
        className={`
          fixed inset-0 z-40 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />


      {/*
      |--------------------------------------------------------------------------
      | DRAWER
      |--------------------------------------------------------------------------
      | Selve cart panelet der slider ind fra højre.
      | translate-x-full = skjult (ude til højre)
      | translate-x-0    = synlig
      |
      */}

      <div className={`
        fixed top-0 right-0 z-50
        h-full w-full max-w-sm
        bg-surface-slidecart
        shadow-2xl
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>


        {/*
        |--------------------------------------------------------------------------
        | HEADER
        |--------------------------------------------------------------------------
        */}

        <div className="h-20 flex-shrink-0 border-b border-border flex items-center justify-between px-6">
          <h2 className="font-heading text-heading-md text-brand-textDark">
            Your cart
          </h2>
          <button
            onClick={closeCart}
            className="text-brand-textMuted hover:text-brand-textDark transition text-xl"
          >
            ✕
          </button>
        </div>


        {/*
        |--------------------------------------------------------------------------
        | TOM CART
        |--------------------------------------------------------------------------
        */}

        {cart.length === 0 ? (

          <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6">

            <p className="font-heading text-heading-md text-brand-textDark">
              Your cart is empty
            </p>

            <p className="text-small text-brand-textMuted">
              Add some fresh lemonade!
            </p>

            <button
              onClick={closeCart}
              className="bg-brand-primary text-white rounded-full px-6 py-2 text-small hover:brightness-105 transition"
            >
              Browse products
            </button>

          </div>

        ) : (

          <>

            {/*
            |--------------------------------------------------------------------------
            | DELIVERY BANNER
            |--------------------------------------------------------------------------
            */}

            <div className={`mx-6 mt-4 px-4 py-2 rounded-xl border text-small flex items-center gap-2
                ${delivery === 0
                    ? "border-success/30 bg-success/5 text-success-DEFAULT"
                    : "border-border bg-warning/5 text-brand-textMuted"
                }
                `}>
                {delivery === 0
                    ? "🚚 Free delivery applied!"
                    : `🚚 You are $${(15 - subtotal).toFixed(2)} away from free delivery!`
                }
            </div>


            {/*
            |--------------------------------------------------------------------------
            | PRODUKTER
            |--------------------------------------------------------------------------
            */}

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">

              {cart.map(item => (

                <div key={item.product_id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-card">

                  {/* Billede */}
                  <div className="bg-cardGradient rounded-xl flex-shrink-0">
                    <Image
                      src={`/${item.image}`}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-xl object-cover"
                    />
                  </div>

                  {/* Højre side */}
                  <div className="flex-1 flex flex-col">

                    {/* Top række — navn og skraldespand */}
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="font-heading text-heading-sm text-brand-textDark">
                          {item.name}
                        </p>
                        <p className="text-small text-brand-textMuted">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      {/*
                      |--------------------------------------------------------------------------
                      | SLET KNAP
                      |--------------------------------------------------------------------------
                      | Åbner confirm dialog i stedet for at slette direkte.
                      | Vi gemmer product_id og navn så dialogen ved hvad der skal slettes.
                      |
                      */}

                      <button
                        onClick={() => {
                          setConfirmItem(item.product_id)
                          setConfirmName(item.name)
                        }}
                        className="text-danger-text hover:brightness-75 transition text-sm"
                      >
                        🗑️
                      </button>

                    </div>

                    {/* Quantity knapper nederst til højre */}
                    <div className="flex justify-end items-center gap-2 mt-auto pt-2">

                      <button
                        onClick={() => {
                            if (item.quantity === 1) {
                            // Sidste item — vis confirm dialog
                            setConfirmItem(item.product_id)
                            setConfirmName(item.name)
                            } else {
                            updateQuantity(item.product_id, item.quantity - 1)
                            }
                        }}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-small hover:border-brand-primary hover:text-brand-primary transition"
                        >
                        −
                      </button>

                      <span className="text-small text-brand-textDark w-4 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-small hover:border-brand-primary hover:text-brand-primary transition"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/*
            |--------------------------------------------------------------------------
            | FOOTER — TOTALER OG CHECKOUT
            |--------------------------------------------------------------------------
            */}

            <div className="px-6 py-5 border-t border-border flex flex-col gap-3 pb-8">

              <div className="flex justify-between text-small text-brand-textMuted">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-small text-brand-textMuted">
                <span>Delivery fee:</span>
                <span>${delivery.toFixed(2)}</span>
              </div>

              {/* Separator */}
              <div className="border-t border-border w-full" />

              <div className="flex justify-between font-heading text-heading-sm text-brand-textDark">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-brand-primary text-white rounded-full py-3 font-body font-semibold hover:brightness-105 transition mt-1">
                Checkout
              </button>

              {/* Betalingsikoner */}
              <div className="flex justify-center items-center gap-3 mt-1 pb-4">
                <span className="text-small text-brand-textMuted">💳</span>
                <span className="text-small text-brand-textMuted">Mastercard</span>
                <span className="text-small text-brand-textMuted">Visa</span>
                <span className="text-small text-brand-textMuted">MobilePay</span>
              </div>

            </div>

          </>

        )}

      </div>


      {/*
      |--------------------------------------------------------------------------
      | CONFIRM DIALOG
      |--------------------------------------------------------------------------
      | Vises når confirmItem ikke er null.
      | onConfirm → fjerner produktet og lukker dialogen.
      | onCancel  → lukker dialogen uden at fjerne.
      |
      */}

      <ConfirmDialog
        isOpen={confirmItem !== null}
        productName={confirmName}
        onConfirm={() => {
          if (confirmItem !== null) removeFromCart(confirmItem)
          setConfirmItem(null)
        }}
        onCancel={() => setConfirmItem(null)}
      />

    </>
  )
}