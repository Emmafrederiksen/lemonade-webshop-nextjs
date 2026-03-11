/* Global state management */ 

"use client"

import { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
    product_id: number
    name: string
    price: number
    image: string
    quantity: number
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void 
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {

    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem("cart")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existingItem = prev.find(p => p.product_id === item.product_id)
            if (existingItem) {
                return prev.map(p =>
                    p.product_id === item.product_id
                    ? { ...p, quantity: p.quantity + 1 } 
                    : p
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.product_id !== id))
    }

    const updateQuantity = (id: number, quantity: number) => {
        setCart(prev => {
            if (quantity <= 0) {
                return prev.filter(item => item.product_id !== id)
            }
            return prev.map(item =>
                item.product_id === id
                    ? { ...item, quantity }
                    : item
            )
        })
    }

    const clearCart = () => setCart([])

    const [isOpen, setIsOpen] = useState(false)
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    return (
        
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isOpen, openCart, closeCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}