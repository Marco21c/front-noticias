import axios from "axios"

// Determina la URL base según el entorno
// Si VITE_DEV es true, usa VITE_BACKEND_URL (desarrollo)
// Si VITE_DEV es false o no existe, usa VITE_URL_HOST (producción)

const baseURL = import.meta.env.VITE_DEV === 'true' 
    ? import.meta.env.VITE_BACKEND_URL 
    : import.meta.env.VITE_URL_HOST;

export const apiClient = axios.create({
    baseURL: baseURL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

