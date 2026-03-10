import { db } from "@/lib/db";

export async function POST(request: Request) {
    
    const body = await request.json()

    const { customer, items } = body

    /*
    |--------------------------------------------------------------------------
    | TRIN 1: Gem kunde
    |--------------------------------------------------------------------------
    */

    const [customerResult]: any = await db.query(
        `INSERT INTO customers (full_name, email, phone, address, city, postal_code)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [customer.fullName, customer.email, customer.phone, customer.address, customer.city, customer.postalCode]
    )

    const customerId = customerResult.insertId


    /*
    |--------------------------------------------------------------------------
    | TRIN 2: Gem ordre
    |--------------------------------------------------------------------------
    */

    const [orderResult]: any = await db.query(
        `INSERT INTO orders (customer_id) VALUES (?)`,
        [customerId]
    )

    const orderId = orderResult.insertId


    /*
    |--------------------------------------------------------------------------
    | TRIN 3: Gem order_items
    |--------------------------------------------------------------------------
    | Vi looper over alle produkter i kurven og gemmer dem.
    |
    */

    for (const item of items) {
        await db.query(
            `INSERT INTO order_items (order_id, product_id, quantity)
            VALUES (?, ?, ?)`,
            [orderId, item.product_id, item.quantity]
        )
    }

    return Response.json({ success: true, orderId})

}