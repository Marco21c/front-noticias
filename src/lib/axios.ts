import axios from "axios"


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_DEV
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.VITE_URL_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

