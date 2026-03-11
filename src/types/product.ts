/*
|--------------------------------------------------------------------------
| Product type
|--------------------------------------------------------------------------
| Defineret ét sted så jeg ikke gentager den samme type
| i ProductCard, FeaturedProducts, ShopPage osv.
|
*/

export type Product = {
  product_id: number
  name: string
  description: string
  price: number
  image: string
  flavor: string
}