import { createContext, useContext } from "react"

export const LoadingContext = createContext(null)

export function usePageLoading() {
    const context = useContext(LoadingContext)

    if (!context) {
        throw new Error("usePageLoading must be used within a LoadingContext provider.")
    }

    return context
}
