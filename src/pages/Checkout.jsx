import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { createOrder } from "../services/orderService"
import "./Checkout.css"

export default function Checkout() {
    const { items, totalPrice, clearCart } = useCart()
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "COD",
    })

    if (items.length === 0) {
        return (
            <div className="empty-state">
                <h2>Nothing to checkout</h2>
                <p>Your cart is empty.</p>
                <Link to="/products" className="btn">Browse products</Link>
            </div>
        )
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try {
            const order = await createOrder({
                items: items.map((i) => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
                total: totalPrice,
                address: { name: form.name, phone: form.phone, line: form.address, city: form.city, pincode: form.pincode },
                paymentMethod: form.paymentMethod,
            })
            clearCart()
            navigate(`/order-success/${order.id}`)
        } catch {
            setError("Could not place the order. Please try again.")
            setSubmitting(false)
        }
    }

    return (
        <div>
            <h1 className="page-title">Checkout</h1>
            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h3>Delivery details</h3>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit phone number" pattern="[0-9]{10}" required />
                    <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" rows={3} required />
                    <div className="form-row">
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
                        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" pattern="[0-9]{6}" required />
                    </div>

                    <h3>Payment</h3>
                    <label className="radio">
                        <input type="radio" name="paymentMethod" value="COD" checked={form.paymentMethod === "COD"} onChange={handleChange} />
                        Cash on delivery
                    </label>
                    <label className="radio">
                        <input type="radio" name="paymentMethod" value="UPI" checked={form.paymentMethod === "UPI"} onChange={handleChange} />
                        UPI (demo)
                    </label>

                    {error && <p className="form-error">{error}</p>}
                    <button className="btn" type="submit" disabled={submitting}>
                        {submitting ? "Placing order..." : `Place order · ₹${totalPrice}`}
                    </button>
                </form>

                <aside className="cart-summary">
                    <h3>Your items</h3>
                    {items.map((i) => (
                        <div key={i.id} className="summary-row">
                            <span>{i.name} × {i.qty}</span>
                            <span>₹{i.price * i.qty}</span>
                        </div>
                    ))}
                    <div className="summary-row summary-total"><span>Total</span><span>₹{totalPrice}</span></div>
                </aside>
            </div>
        </div>
    )
}