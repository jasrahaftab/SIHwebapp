import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"
import "./Cart.css"

export default function Cart() {
    const { items, updateQty, removeFromCart, totalPrice } = useCart()

    if (items.length === 0) {
        return (
            <div className="empty-state">
                <h2>Your cart is empty</h2>
                <p>Find something handmade you love.</p>
                <Link to="/products" className="btn">Start shopping</Link>
            </div>
        )
    }

    return (
        <div>
            <h1 className="page-title">Your cart</h1>
            <div className="cart-layout">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-info">
                                <Link to={`/products/${item.id}`}><h3>{item.name}</h3></Link>
                                <p className="cart-item-price">₹{item.price}</p>
                                <div className="qty">
                                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                </div>
                            </div>
                            <div className="cart-item-side">
                                <strong>₹{item.price * item.qty}</strong>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="cart-summary">
                    <h3>Order summary</h3>
                    <div className="summary-row"><span>Subtotal</span><span>₹{totalPrice}</span></div>
                    <div className="summary-row"><span>Delivery</span><span>Free</span></div>
                    <div className="summary-row summary-total"><span>Total</span><span>₹{totalPrice}</span></div>
                    <Link to="/checkout" className="btn summary-btn">Proceed to checkout</Link>
                </aside>
            </div>
        </div>
    )
}