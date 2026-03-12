"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import CheckoutCustomer from "@/components/sections/checkout/CheckoutCustomer"
import CheckoutOwner from "@/components/sections/checkout/CheckoutOwner"

type View = "customer" | "owner"

/*
|--------------------------------------------------------------------------
| CheckoutContent
|--------------------------------------------------------------------------
| useSearchParams kræver Suspense i Next.js production builds.
| Vi udtrækker indholdet til en separat komponent og wrapper den i Suspense.
|
*/

function CheckoutContent() {

  const searchParams = useSearchParams()
  const [view, setView] = useState<View>("customer")

  useEffect(() => {
    const viewParam = searchParams.get("view")
    if (viewParam === "owner") {
      setView("owner")
    }
  }, [searchParams])

  return (
    <main>

      <div className="bg-heroGradient py-12 flex flex-col items-center gap-6">

        <h1 className="font-heading text-heading-xl text-brand-textDark">
          Checkout
        </h1>

        <div className="flex rounded-full border border-border overflow-hidden">

          <button
            onClick={() => setView("customer")}
            className={`px-6 py-2 text-small font-semibold transition
              ${view === "customer"
                ? "bg-brand-primary text-white"
                : "bg-white text-brand-textMuted"
              }
            `}
          >
            Customer
          </button>

          <button
            onClick={() => setView("owner")}
            className={`px-6 py-2 text-small font-semibold transition
              ${view === "owner"
                ? "bg-brand-primary text-white"
                : "bg-white text-brand-textMuted"
              }
            `}
          >
            Owner
          </button>

        </div>

      </div>

      {view === "customer" ? <CheckoutCustomer /> : <CheckoutOwner />}

    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <p className="text-brand-textMuted">Loading...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}