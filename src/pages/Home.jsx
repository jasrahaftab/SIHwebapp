import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProductCard from "../components/product/ProductCard"
import { getProducts } from "../services/productService"
import { getArtisans } from "../services/artisanService"
import { CATEGORIES } from "../utils/constants"
import "./Home.css"

export default function Home() {
    const [products, setProducts] = useState([])
    const [artisans, setArtisans] = useState([])
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getProducts().then((data) => setProducts(data.slice(0, 4)))
        getArtisans().then(setArtisans)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/products?search=${encodeURIComponent(query)}`)
    }

    return (
        <div>
            <section className="hero">
                <h1>Handmade by India's artisans, delivered to you</h1>
                <p>Buy directly from weavers, potters and craftspeople. Fair prices, real stories.</p>
                <form className="hero-search" onSubmit={handleSearch}>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sarees, pots, baskets..." />
                    <button className="btn" type="submit">Search</button>
                </form>
            </section>

            <section className="section">
                <h2 className="section-title">Shop by category</h2>
                <div className="category-row">
                    {CATEGORIES.map((c) => (
                        <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="category-chip">
                            {c}
                        </Link>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2 className="section-title">Featured products</h2>
                <div className="product-grid">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
                <div className="center-row">
                    <Link to="/products" className="btn-outline">View all products</Link>
                </div>
            </section>

            <section className="section">
                <h2 className="section-title">Meet the artisans</h2>
                <div className="artisan-grid">
                    {artisans.map((a) => (
                        <Link key={a.id} to={`/artisans/${a.id}`} className="artisan-card">
                            <img src={a.photo} alt={a.name} />
                            <h3>{a.name}</h3>
                            <p>{a.craft}</p>
                            <span>{a.village}, {a.state}</span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="section how-it-works">
                <h2 className="section-title">How it works</h2>
                <div className="steps-grid">
                    <div className="step"><span>1</span><p>Artisans list products with just a photo and their voice</p></div>
                    <div className="step"><span>2</span><p>AI writes the description and suggests a fair price</p></div>
                    <div className="step"><span>3</span><p>You buy directly, and the artisan earns more</p></div>
                </div>
            </section>
        </div>
    )
}