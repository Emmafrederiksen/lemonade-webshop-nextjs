import { CartItem } from "@/context/CartContext"

/*
|--------------------------------------------------------------------------
| useCartCalculations
|--------------------------------------------------------------------------
| Beregner subtotal, delivery og total udfra cart items.
| Bruges i SlideCart og CheckoutCustomer så jeg undgår at gentage den samme beregningskode to steder.
|
*/

export function useCartCalculations(cart: CartItem[]) {

    const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    
    const delivery = subtotal >= 15 ? 0 : 3

    const total = subtotal + delivery

    return { subtotal, delivery, total }
}