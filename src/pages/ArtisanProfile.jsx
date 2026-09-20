import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ProductCard from "../components/product/ProductCard"
import { getArtisanById } from "../services/artisanService"
import { useLanguage } from "../context/LanguageContext"
import "./ArtisanProfile.css"

export default function ArtisanProfile() {
    const { id } = useParams()
    const { lang } = useLanguage()
    const [artisan, setArtisan] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArtisanById(id).then((a) => {
            setArtisan(a)
            setLoading(false)
        })
    }, [id])

    if (loading) return <p>Loading...</p>

    if (!artisan) {
        return (
            <div className="empty-state">
                <h2>Artisan not found</h2>
                <Link to="/" className="btn">Go home</Link>
            </div>
        )
    }

    return (
        <div>
            <div className="artisan-header">
                <img src={artisan.photo} alt={artisan.name} />
                <div>
                    <h1>{artisan.name}</h1>
                    <p className="artisan-craft">{artisan.craft}</p>
                    <p className="artisan-place">{artisan.village}, {artisan.state}</p>
                    <p>{lang === "en" ? artisan.story_en : artisan.story_hi}</p>
                </div>
            </div>

            <h2 className="section-title">Products by {artisan.name}</h2>
            {artisan.products.length === 0 ? (
                <p>No products listed yet.</p>
            ) : (
                <div className="product-grid">
                    {artisan.products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    )
}