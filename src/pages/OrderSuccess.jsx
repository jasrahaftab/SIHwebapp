import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getOrderById } from "../services/orderService"

export default function OrderSuccess() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        getOrderById(id).then(setOrder)
    }, [id])

    return (
        <div className="empty-state">
            <h1>🎉 Order placed!</h1>
            <p>
                Thank you for supporting India's artisans.
                {order && <> Your order number is <strong>{order.id}</strong>. Total: ₹{order.total}.</>}
            </p>
            <Link to="/products" className="btn">Continue shopping</Link>
        </div>
    )
}
