import axios from "axios"

const develop = false

const url = develop ? import.meta.env.VITE_BACKEND_URL : import.meta.env.VITE_URL_HOST;
export const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

