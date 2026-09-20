import axios from "axios"
import { mockArtisans } from "../data/mockArtisans"
import { mockProducts } from "../data/mockProducts"

const USE_MOCK = true
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export async function getArtisans() {
    if (USE_MOCK) return mockArtisans
    const res = await api.get("/artisans")
    return res.data
}

// Returns { ...artisan, products: [...] }
export async function getArtisanById(id) {
    if (USE_MOCK) {
        const artisan = mockArtisans.find((a) => a.id === id)
        if (!artisan) return null
        const products = mockProducts.filter((p) => p.artisan.id === id)
        return { ...artisan, products }
    }
    const res = await api.get(`/artisans/${id}`)
    return res.data
}