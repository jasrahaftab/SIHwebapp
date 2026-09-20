import axios from "axios"
import { mockProducts } from "../data/mockProducts"

const USE_MOCK = true // switch to false once the backend is ready
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export async function getProducts() {
    if (USE_MOCK) return mockProducts
    const res = await api.get("/products")
    return res.data
}

export async function getProductById(id) {
    if (USE_MOCK) return mockProducts.find((p) => p.id === id)
    const res = await api.get(`/products/${id}`)
    return res.data
}