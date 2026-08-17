export const API_BASE = "https://syncsphere-hiv6.onrender.com"

export async function fetchWithRetry(path, attempts = 3) {
    let lastError
    for (let i = 0; i < attempts; i++) {
        try {
            
            const res = await fetch(API_BASE + path)
            if (!res.ok) throw new Error("HTTP " + res.status)
            return await res.json()
        } catch (err) {
            lastError = err
        }
    }
    throw lastError
}


export function formatPrice(course, countryCode) {
    const isUS = countryCode === "US"
    return new Intl.NumberFormat(isUS ? "en-US" : "en-IN", {
        style: "currency",
        currency: isUS ? "USD" : "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format((isUS ? course.priceUsdCents : course.pricePaise) / 100)
}
