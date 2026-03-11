"use client"

import { useEffect, useState } from "react"
import Container from "@/components/layout/Container"

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type OrderItem = {
  quantity: number
  product_id: number
  product_name: string
  price: number
  ingredient_name: string
  cost_per_unit: number
  quantity_required: number
}

type Order = {
  order_id: number
  created_at: string
  full_name: string
  email: string
}

type OrderData = {
  order: Order
  items: OrderItem[]
}


export default function CheckoutOwner() {

  const [data, setData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  /*
  |--------------------------------------------------------------------------
  | HENT SENESTE ORDRE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetch("/api/orders/latest")
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="flex justify-center py-20">
      <p className="text-brand-textMuted">Loading order...</p>
    </div>
  )

  if (!data) return (
    <div className="flex justify-center py-20">
      <p className="text-brand-textMuted">No orders yet.</p>
    </div>
  )


  /*
  |--------------------------------------------------------------------------
  | BEREGNINGER
  |--------------------------------------------------------------------------
  | Vi grupperer items per produkt og beregner revenue, cost og profit.
  |
  */

  // Unikke produkter med quantity
  const products = data.items.reduce((acc: any, item) => {
    if (!acc[item.product_id]) {
      acc[item.product_id] = {
        product_id: item.product_id,
        name: item.product_name,
        price: item.price,
        quantity: item.quantity,
        ingredients: []
      }
    }
    acc[item.product_id].ingredients.push({
      name: item.ingredient_name,
      cost_per_unit: item.cost_per_unit,
      quantity_required: item.quantity_required,
      quantity_ordered: item.quantity
    })
    return acc
  }, {})

  const productList = Object.values(products) as any[]

  // Total revenue
  const revenue = productList.reduce((sum: number, p: any) =>
    sum + p.price * p.quantity, 0)

  // Alle ingredienser på tværs af produkter
  const allIngredients = data.items.reduce((acc: any, item) => {
    const key = item.ingredient_name
    if (!acc[key]) {
      acc[key] = {
        name: item.ingredient_name,
        cost_per_unit: item.cost_per_unit,
        used: 0,
        total: 0
      }
    }
    const used = item.quantity_required * item.quantity
    acc[key].used += used
    acc[key].total += used * item.cost_per_unit
    return acc
  }, {})

  const ingredientList = Object.values(allIngredients) as any[]

  // Total ingredient cost
  const ingredientCost = ingredientList.reduce((sum: number, i: any) => sum + i.total, 0)

  // Net profit
  const netProfit = revenue - ingredientCost

  // Total items
  const totalItems = productList.reduce((sum: number, p: any) => sum + p.quantity, 0)


  return (

    <Container>

      <div className="py-12 flex flex-col gap-8">


        {/*
        |--------------------------------------------------------------------------
        | ORDER OVERVIEW
        |--------------------------------------------------------------------------
        */}

        <div className="border border-border rounded-2xl p-6">

          <h2 className="font-heading text-heading-md text-brand-textDark mb-4">
            Order Overview
          </h2>

          <div className="bg-surface-footer rounded-xl p-4 flex flex-col gap-2 mb-6">
            <p className="text-small text-brand-textMuted">⭐ Order #{data.order.order_id}</p>
            <p className="text-small text-brand-textMuted">
              📅 Placed: {new Date(data.order.created_at).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric"
              })}
            </p>
            <p className="text-small text-brand-textMuted">📦 Total items: {totalItems}</p>
          </div>

          {/* Revenue, Cost, Profit bokse */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-success/5 border border-success/20 rounded-2xl p-4 text-center">
              <p className="text-small text-brand-textMuted mb-1">Revenue</p>
              <p className="font-heading text-heading-md text-brand-textDark">
                ${revenue.toFixed(2)}
              </p>
            </div>

            <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4 text-center">
              <p className="text-small text-brand-textMuted mb-1">Ingredient Cost</p>
              <p className="font-heading text-heading-md text-brand-textDark">
                ${ingredientCost.toFixed(2)}
              </p>
            </div>

            <div className="bg-danger/5 border border-danger/20 rounded-2xl p-4 text-center">
              <p className="text-small text-brand-textMuted mb-1">Net Profit</p>
              <p className="font-heading text-heading-md text-brand-textDark">
                ${netProfit.toFixed(2)}
              </p>
            </div>

          </div>

        </div>


        {/* TABELLER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


          {/*
          |--------------------------------------------------------------------------
          | ORDER SUMMARY TABEL
          |--------------------------------------------------------------------------
          */}

          <div className="border border-border rounded-2xl p-6">

            <h2 className="font-heading text-heading-sm text-brand-textDark mb-4">
              Order Summary
            </h2>

            <table className="w-full text-small">

              <thead>
                <tr className="border-b border-border text-brand-textMuted">
                  <th className="text-left py-2">Product</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Revenue</th>
                  <th className="text-right py-2">Cost</th>
                  <th className="text-right py-2 text-success-DEFAULT">Profit</th>
                </tr>
              </thead>

              <tbody>
                {productList.map((p: any) => {

                  const productCost = p.ingredients.reduce((sum: number, i: any) =>
                    sum + i.cost_per_unit * i.quantity_required * p.quantity, 0)
                  const productRevenue = p.price * p.quantity
                  const productProfit = productRevenue - productCost

                  return (
                    <tr key={p.product_id} className="border-b border-border/50">
                      <td className="py-3 text-brand-textDark">{p.name}</td>
                      <td className="py-3 text-center text-brand-textMuted">{p.quantity}</td>
                      <td className="py-3 text-right text-brand-textMuted">${productRevenue.toFixed(2)}</td>
                      <td className="py-3 text-right text-brand-textMuted">${productCost.toFixed(2)}</td>
                      <td className="py-3 text-right text-success-DEFAULT font-semibold">${productProfit.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>

            </table>

          </div>


          {/*
          |--------------------------------------------------------------------------
          | INGREDIENT COST BREAKDOWN
          |--------------------------------------------------------------------------
          */}

          <div className="border border-border rounded-2xl p-6">

            <h2 className="font-heading text-heading-sm text-brand-textDark mb-4">
              Ingredient Cost Breakdown
            </h2>

            <table className="w-full text-small">

              <thead>
                <tr className="border-b border-border text-brand-textMuted">
                  <th className="text-left py-2">Ingredient</th>
                  <th className="text-center py-2">Used</th>
                  <th className="text-right py-2">Cost/Unit</th>
                  <th className="text-right py-2 text-success-DEFAULT">Total</th>
                </tr>
              </thead>

              <tbody>
                {ingredientList.map((i: any) => (
                  <tr key={i.name} className="border-b border-border/50">
                    <td className="py-3 text-brand-textDark">{i.name}</td>
                    <td className="py-3 text-center text-brand-textMuted">{i.used}</td>
                    <td className="py-3 text-right text-brand-textMuted">${i.cost_per_unit.toFixed(2)}</td>
                    <td className="py-3 text-right text-success-DEFAULT font-semibold">${i.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-right text-brand-textMuted font-semibold">
                    Total Cost:
                  </td>
                  <td className="pt-4 text-right text-brand-textDark font-semibold">
                    ${ingredientCost.toFixed(2)}
                  </td>
                </tr>
              </tfoot>

            </table>

          </div>

        </div>

      </div>

    </Container>

  )
}