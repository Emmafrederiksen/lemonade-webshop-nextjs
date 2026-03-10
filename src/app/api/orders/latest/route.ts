import { db } from "@/lib/db"

export async function GET() {

  /*
  |--------------------------------------------------------------------------
  | Hent seneste ordre med kunde og produkter
  |--------------------------------------------------------------------------
  */

  const [orders]: any = await db.query(
    `SELECT o.order_id, o.created_at, c.full_name, c.email
     FROM orders o
     JOIN customers c ON o.customer_id = c.customer_id
     ORDER BY o.created_at DESC
     LIMIT 1`
  )

  if (orders.length === 0) {
    return Response.json(null)
  }

  const order = orders[0]

  /*
  |--------------------------------------------------------------------------
  | Hent order items med produkt og ingrediens info
  |--------------------------------------------------------------------------
  */

  const [items]: any = await db.query(
    `SELECT 
      oi.quantity,
      p.product_id,
      p.name AS product_name,
      p.price,
      i.name AS ingredient_name,
      i.cost_per_unit,
      pi.quantity_required
     FROM order_items oi
     JOIN products p ON oi.product_id = p.product_id
     JOIN product_ingredients pi ON p.product_id = pi.product_id
     JOIN ingredients i ON pi.ingredient_id = i.ingredient_id
     WHERE oi.order_id = ?`,
    [order.order_id]
  )

  return Response.json({ order, items })

}