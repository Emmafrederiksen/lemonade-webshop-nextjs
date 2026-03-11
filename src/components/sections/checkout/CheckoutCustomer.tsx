"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { useState, useEffect } from "react"
import Container from "@/components/layout/Container"
import Image from "next/image"
import ConfirmDialog from "@/components/confirmdialog/ConfirmDialog"

export default function CheckoutCustomer() {

  /*
  |--------------------------------------------------------------------------
  | HOOKS
  |--------------------------------------------------------------------------
  */

  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  const [mounted, setMounted] = useState(false)
  const [confirmItem, setConfirmItem] = useState<number | null>(null)
  const [confirmName, setConfirmName] = useState("")

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /*
  |--------------------------------------------------------------------------
  | BEREGNINGER
  |--------------------------------------------------------------------------
  */

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal >= 15 ? 0 : 3
  const total = subtotal + delivery

  /*
  |--------------------------------------------------------------------------
  | FORM HANDLER
  |--------------------------------------------------------------------------
  */

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  /*
  |--------------------------------------------------------------------------
  | SUBMIT HANDLER
  |--------------------------------------------------------------------------
  | Validerer form, sender ordre til API, rydder cart og navigerer til owner.
  |
  */

  async function handleSubmit() {

    if (!form.fullName || !form.email || !form.address) {
      alert("Please fill in all required fields")
      return
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: form,
        items: cart
      })
    })

    const data = await res.json()

    if (data.success) {
      clearCart()
      router.push("/checkout?view=owner")
    }

  }

  return (

    <Container>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">

        {/* VENSTRE — Formularer */}
        <div className="flex flex-col gap-6">

          {/* Kontaktinfo */}
          <div className="border border-border rounded-2xl p-6 flex flex-col gap-4">

            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-small flex items-center justify-center font-semibold">
                1
              </span>
              <h2 className="font-heading text-heading-sm text-brand-textDark">
                Contact Information
              </h2>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">👤</span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">✉️</span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">📞</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                type="tel"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition"
              />
            </div>

          </div>

          {/* Leveringsadresse */}
          <div className="border border-border rounded-2xl p-6 flex flex-col gap-4">

            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-small flex items-center justify-center font-semibold">
                2
              </span>
              <h2 className="font-heading text-heading-sm text-brand-textDark">
                Delivery Address
              </h2>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">🏠</span>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">📍</span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">✉️</span>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition"
              />
            </div>

          </div>

          {/* Continue knap */}
          <button
            onClick={handleSubmit}
            className="w-full bg-brand-primary text-white rounded-full py-3 font-body font-semibold hover:brightness-105 transition"
          >
            Continue to payment
          </button>

          {/* Betalingsikoner */}
          <div className="flex justify-center items-center gap-3">
            <span className="text-small text-brand-textMuted">💳</span>
            <span className="text-small text-brand-textMuted">Mastercard</span>
            <span className="text-small text-brand-textMuted">Visa</span>
            <span className="text-small text-brand-textMuted">MobilePay</span>
          </div>

        </div>

        {/* HØJRE — Order Summary */}
        <div className="border border-border rounded-2xl p-6 flex flex-col gap-4 self-start">

          <h2 className="font-heading text-heading-sm text-brand-textDark border-b border-border pb-3">
            Order Summary
          </h2>

          <div className={`px-4 py-2 rounded-xl border text-small flex items-center gap-2
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

          <div className="flex flex-col gap-3">

            {cart.map(item => (

              <div key={item.product_id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-card">

                <div className="bg-cardGradient rounded-xl flex-shrink-0">
                  <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-xl object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-heading-sm text-brand-textDark">
                        {item.name}
                      </p>
                      <p className="text-small text-brand-textMuted">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

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

                  <div className="flex justify-end items-center gap-2 mt-auto pt-2">

                    <button
                      onClick={() => {
                        if (item.quantity === 1) {
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

          <div className="flex flex-col gap-2 pt-2">

            <div className="flex justify-between text-small text-brand-textMuted">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-small text-brand-textMuted">
              <span>Delivery fee:</span>
              <span>${delivery.toFixed(2)}</span>
            </div>

            <div className="border-t border-border w-full mt-1" />

            <div className="flex justify-between font-heading text-heading-sm text-brand-textDark">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {delivery === 0 && (
              <p className="text-small text-success-DEFAULT">
                You saved <span className="font-semibold">$3</span> on delivery! 🎉
              </p>
            )}

          </div>

        </div>

      </div>

      <ConfirmDialog
        isOpen={confirmItem !== null}
        productName={confirmName}
        onConfirm={() => {
          if (confirmItem !== null) removeFromCart(confirmItem)
          setConfirmItem(null)
        }}
        onCancel={() => setConfirmItem(null)}
      />

    </Container>

  )
}