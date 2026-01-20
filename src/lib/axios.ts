import axios from "axios"

export const apiClient = axios.create({
    baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.URL_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

