import axios from "axios"

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const URL_BACKEND = import.meta.env.VITE_BACKEND_URL;