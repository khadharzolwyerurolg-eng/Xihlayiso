const API_BASE_URL = (
    process.env.REACT_APP_API_URL || "https://xihlayiso.onrender.com/api"
).replace(/\/+$/, "")

export const BIOGRAPHY_API_URL = `${API_BASE_URL}/biography`
