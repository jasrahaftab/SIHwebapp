import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { useLanguage } from "../../context/LanguageContext"
import "./Navbar.css"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [query, setQuery] = useState("")
    const { totalItems } = useCart()
    const { lang, toggleLang } = useLanguage()
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/products?search=${encodeURIComponent(query)}`)
        setMenuOpen(false)
    }

    const langLabel = lang === "en" ? "EN | हिं" : "हिं | EN"

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">KalaBazaar</Link>

                <form onSubmit={handleSearch} className="navbar-search-form">
                    <input
                        className="navbar-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search handmade products..."
                    />
                </form>

                <nav className="navbar-links">
                    <Link to="/products">Shop</Link>
                    <button className="lang-btn" onClick={toggleLang}>{langLabel}</button>
                    <Link to="/cart" className="cart-link">
                        <ShoppingCart size={22} />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                </nav>

                <div className="navbar-mobile-buttons">
                    <Link to="/cart" className="cart-link">
                        <ShoppingCart size={22} />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                    <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="mobile-menu">
                    <form onSubmit={handleSearch}>
                        <input
                            className="mobile-search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                        />
                    </form>
                    <Link to="/products" onClick={() => setMenuOpen(false)}>Shop</Link>
                    <button className="lang-btn" onClick={toggleLang}>{langLabel}</button>
                </div>
            )}
        </header>
    )
}
