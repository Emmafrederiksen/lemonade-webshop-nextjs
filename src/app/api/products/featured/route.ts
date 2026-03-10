import { db } from "@/lib/db"

export async function GET() {
    
    const [rows] = await db.query (
        "SELECT * FROM products LIMIT 3"
    )

    return Response.json(rows)
}