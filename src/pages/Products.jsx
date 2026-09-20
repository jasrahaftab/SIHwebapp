import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/product/ProductCard"
import { getProducts } from "../services/productService"
import { CATEGORIES } from "../utils/constants"
import "./Products.css"

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [params, setParams] = useSearchParams()

    const search = params.get("search") || ""
    const category = params.get("category") || ""

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data)
            setLoading(false)
        })
    }, [])

    const updateParam = (key, value) => {
        const next = new URLSearchParams(params)
        if (value) next.set(key, value)
        else next.delete(key)
        setParams(next)
    }

    const filtered = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = !category || p.category === category
        return matchesSearch && matchesCategory
    })

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h1 className="page-title">{category || "All Products"}</h1>

            <input
                className="page-search"
                value={search}
                onChange={(e) => updateParam("search", e.target.value)}
                placeholder="Search products..."
            />

            <div className="chip-row">
                <button className={`chip ${!category ? "chip-active" : ""}`} onClick={() => updateParam("category", "")}>
                    All
                </button>
                {CATEGORIES.map((c) => (
                    <button
                        key={c}
                        className={`chip ${category === c ? "chip-active" : ""}`}
                        onClick={() => updateParam("category", c)}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="empty-state">
                    <h3>No products found</h3>
                    <p>Try a different search or category.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {filtered.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    )
}