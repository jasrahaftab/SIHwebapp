import axios from "axios"

const USE_MOCK = true
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export async function createOrder(order) {
    if (USE_MOCK) {
        const newOrder = {
            ...order,
            id: "ORD" + Date.now().toString().slice(-6),
            status: "New",
            createdAt: new Date().toISOString(),
        }
        const all = JSON.parse(localStorage.getItem("orders") || "[]")
        localStorage.setItem("orders", JSON.stringify([newOrder, ...all]))
        return newOrder
    }
    const res = await api.post("/orders", order)
    return res.data
}

export async function getOrderById(id) {
    if (USE_MOCK) {
        const all = JSON.parse(localStorage.getItem("orders") || "[]")
        return all.find((o) => o.id === id) || null
    }
    const res = await api.get(`/orders/${id}`)
    return res.data
}