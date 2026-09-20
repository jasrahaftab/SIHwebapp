import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProductById } from "../services/productService"
import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext"
import "./ProductDetail.css"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const { lang, setLang } = useLanguage()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [qty, setQty] = useState(1)
    const [activeImg, setActiveImg] = useState(0)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        setLoading(true)
        getProductById(id).then((p) => {
            setProduct(p)
            setLoading(false)
        })
    }, [id])

    if (loading) return <p>Loading...</p>

    if (!product) {
        return (
            <div className="empty-state">
                <h2>Product not found</h2>
                <p>It may have been removed.</p>
                <Link to="/products" className="btn">Back to shop</Link>
            </div>
        )
    }

    const b = product.priceBreakdown
    const total = b.material + b.labour + b.margin
    const pct = (v) => Math.round((v / total) * 100)
    const outOfStock = product.stock === 0

    const handleAdd = () => {
        addToCart(product, qty)
        setAdded(true)
        setTimeout(() => setAdded(false), 1500)
    }

    const handleBuyNow = () => {
        addToCart(product, qty)
        navigate("/checkout")
    }

    return (
        <div className="pd">
            <div className="pd-gallery">
                <img src={product.images[activeImg]} alt={product.name} className="pd-main-img" />
                {product.images.length > 1 && (
                    <div className="pd-thumbs">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                className={i === activeImg ? "thumb-active" : ""}
                                onClick={() => setActiveImg(i)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="pd-info">
                <p className="pd-category">{product.category}</p>
                <h1>{product.name}</h1>
                <p className="pd-price">₹{product.price}</p>
                <p className={outOfStock ? "stock out" : product.stock <= 5 ? "stock low" : "stock in"}>
                    {outOfStock ? "Out of stock" : product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
                </p>

                <div className="lang-tabs">
                    <button className={lang === "en" ? "tab-active" : ""} onClick={() => setLang("en")}>English</button>
                    <button className={lang === "hi" ? "tab-active" : ""} onClick={() => setLang("hi")}>हिंदी</button>
                </div>
                <p className="pd-desc">{lang === "en" ? product.description_en : product.description_hi}</p>
                {product.aiGenerated && <span className="ai-badge">AI-generated listing</span>}

                {!outOfStock && (
                    <div className="pd-actions">
                        <div className="qty">
                            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
                        </div>
                        <button className="btn" onClick={handleAdd}>{added ? "Added ✓" : "Add to cart"}</button>
                        <button className="btn-outline" onClick={handleBuyNow}>Buy now</button>
                    </div>
                )}

                <div className="price-box">
                    <h3>Fair price breakdown</h3>
                    <p className="price-note">See where your money goes.</p>
                    <div className="price-bar">
                        <div style={{ width: `${pct(b.material)}%` }} className="bar-material" />
                        <div style={{ width: `${pct(b.labour)}%` }} className="bar-labour" />
                        <div style={{ width: `${pct(b.margin)}%` }} className="bar-margin" />
                    </div>
                    <ul>
                        <li><i className="dot bar-material" /> Materials <b>₹{b.material}</b></li>
                        <li><i className="dot bar-labour" /> Artisan's labour <b>₹{b.labour}</b></li>
                        <li><i className="dot bar-margin" /> Platform &amp; delivery <b>₹{b.margin}</b></li>
                    </ul>
                </div>

                <Link to={`/artisans/${product.artisan.id}`} className="pd-artisan">
                    <span>Made by</span>
                    <strong>{product.artisan.name}</strong>
                    <small>{product.artisan.village}</small>
                </Link>
            </div>
        </div>
    )
}