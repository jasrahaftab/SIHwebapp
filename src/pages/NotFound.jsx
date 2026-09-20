import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="empty-state">
            <h1>404</h1>
            <p>This page doesn't exist.</p>
            <Link to="/" className="btn">Go home</Link>
        </div>
    )
}