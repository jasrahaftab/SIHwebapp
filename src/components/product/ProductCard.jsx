import { Link } from "react-router-dom"
import "./ProductCard.css"

export default function ProductCard({ product }) {
    return (
        <Link to={`/products/${product.id}`} className="product-card">
            <img src={product.images[0]} alt={product.name} className="product-card-img" />
            <div className="product-card-body">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-artisan">
                    {product.artisan.name} · {product.artisan.village}
                </p>
                <div className="product-card-footer">
                    <span className="product-card-price">₹{product.price}</span>
                    {product.aiGenerated && <span className="ai-badge">AI listed</span>}
                </div>
            </div>
        </Link>
    )
}