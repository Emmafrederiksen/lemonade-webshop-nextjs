/* Global state management */ 

"use client"

// Next.js bruger Server Components som default.
// Men fordi jeg bruger React hooks (useState, useContext),
// skal denne fil køre i browseren.
// Derfor skriver jeg "use client" først.


import { createContext, useContext, useState } from "react"


/*
|--------------------------------------------------------------------------
| TYPE: CartItem
|--------------------------------------------------------------------------
| Her definerer jeg hvordan et produkt i kurven ser ud.
|
| TypeScript bruger strukturen til at sikre,
| at dataen altid har de rigtige felter.
|
| Eksempel på et item i cart:
|
| {
|   id: 1,
|   name: "Lemon Classic",
|   price: 5,
|   image: "/lemonClassic.png",
|   quantity: 2
| }
|
*/

type CartItem = {
    id: number
    name: string
    price: number
    image: string
    quantity: number
}



/*
|--------------------------------------------------------------------------
| TYPE: CartContextType
|--------------------------------------------------------------------------
| Her definerer jeg hvilke data og funktioner
| min Context skal gøre tilgængelige i hele appen.
|
| Det betyder at alle komponenter kan bruge:
|
| cart → listen over produkter i kurven
| addToCart() → tilføje produkt
| removeFromCart() → fjerne produkt
|
*/

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void 
}



/*
|--------------------------------------------------------------------------
| CREATE CONTEXT
|--------------------------------------------------------------------------
| Her opretter jeg selve CartContext.
|
| Context fungerer som en global container
| hvor data kan deles mellem mange komponenter
| uden at sende props ned gennem hele komponenttræet.
|
*/

const CartContext = createContext<CartContextType | null>(null)



/*
|--------------------------------------------------------------------------
| CART PROVIDER
|--------------------------------------------------------------------------
| CartProvider er en komponent som "wrapper" hele appen.
|
| Når jeg placerer CartProvider i layout.tsx,
| vil alle sider og komponenter få adgang til cart data.
|
*/

export function CartProvider({ children }: { children: React.ReactNode }) {


    /*
    |--------------------------------------------------------------------------
    | STATE: cart
    |--------------------------------------------------------------------------
    | Her gemmer jeg alle produkter i kurven.
    |
    | useState betyder at React holder styr på state
    | og re-render komponenter når cart ændrer sig.
    |
    | Startværdi = tom array
    |
    */

    const [cart, setCart] = useState<CartItem[]>([])


    /*
    |--------------------------------------------------------------------------
    | FUNCTION: addToCart
    |--------------------------------------------------------------------------
    | Denne funktion bliver kaldt når brugeren klikker:
    |
    | "Add to cart"
    |
    */
    const addToCart = (item: CartItem) => {

        setCart(prev => {

            /*
            --------------------------------------------------------------------------
            | Tjek om produktet allerede findes i kurven
            --------------------------------------------------------------------------
            |
            | Hvis et produkt allerede ligger i kurven, vil jeg IKKE tilføje en ny linje.
            | I stedet øges quantity.
            |
            */

            const existingItem = prev.find(p => p.id === item.id)

            /*
            --------------------------------------------------------------------------
            | Hvis produktet allerede findes
            --------------------------------------------------------------------------
            |
            | Jeg bruger map() til at gennemgå alle produkter og opdatere det rigtige item.
            |
            */

            if (existingItem) {
                return prev.map(p =>
                    p.id === item.id
                    ? { ...p, quantity: p.quantity + 1 } 
                    : p
                )
            }


            /*
            --------------------------------------------------------------------------
            | Hvis produktet ikke findes
            --------------------------------------------------------------------------
            |
            | Jeg tilføjer produktet til kurven og sætter quantity = 1
            |
            */

            return [...prev, { ...item, quantity: 1 }]
        })

    }


    /*
    |--------------------------------------------------------------------------
    | FUNCTION: removeFromCart
    |--------------------------------------------------------------------------
    | Denne funktion fjerner et produkt fra kurven.
    |
    | Bruges f.eks. når brugeren klikker på trash icon i cart.
    |
    */
    const removeFromCart = (id: number) => {

        /* filter() laver en ny liste hvor alle items med dette id fjernes */
        setCart(prev => prev.filter(item => item.id !== id))
    }


    const updateQuantity = (id: number, quantity: number) => {

        setCart(prev => {

            // Hvis quantity er 0 eller mindre, fjern produktet helt
            if (quantity <= 0) {
            return prev.filter(item => item.id !== id)
            }

            // Ellers opdater quantity på det rigtige produkt
            return prev.map(item =>
            item.id === id
                ? { ...item, quantity }
                : item
            )

        })

    }


    /*
    |--------------------------------------------------------------------------
    | PROVIDER
    |--------------------------------------------------------------------------
    |
    | Her gør jeg cart data tilgængeligt for hele appen.
    | value = de data jeg gerne vil dele globalt
    |
    */
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )

}


/*
|--------------------------------------------------------------------------
| CUSTOM HOOK: useCart
|--------------------------------------------------------------------------
|
| Dette er en hjælpe funktion som gør det lettere at bruge CartContext i komponenter.
|
| I stedet for:
|
| const context = useContext(CartContext)
|
| kan jeg bare skrive:
|
| const { cart } = useCart()
|
*/

export function useCart() {
    
    const context = useContext(CartContext)

    /*
    --------------------------------------------------------------------------
    | Safety check
    --------------------------------------------------------------------------
    |
    | Hvis useCart bruges udenfor CartProvider gives en fejl.
    |
    */

    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }

    return context
}