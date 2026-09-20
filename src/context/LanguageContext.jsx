import { createContext, useContext, useState } from "react"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(localStorage.getItem("lang") || "en")

    const setLang = (l) => {
        setLangState(l)
        localStorage.setItem("lang", l)
    }
    const toggleLang = () => setLang(lang === "en" ? "hi" : "en")

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)