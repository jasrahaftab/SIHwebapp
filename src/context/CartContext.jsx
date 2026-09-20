import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cart")) || []
        } catch {
            return []
        }
    })

    // Save the cart whenever it changes, so a refresh doesn't empty it
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addToCart = (product, qty = 1) => {
        setItems((prev) => {
            const found = prev.find((i) => i.id === product.id)
            if (found) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, product.stock) } : i
                )
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    stock: product.stock,
                    qty,
                },
            ]
        })
    }

    const updateQty = (id, qty) =>
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, i.stock)) } : i))
        )

    const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0)

    return (
        <CartContext.Provider
            value={{ items, addToCart, updateQty, removeFromCart, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)