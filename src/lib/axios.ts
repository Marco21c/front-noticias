import axios from "axios";

const isDev = import.meta.env.MODE === "development";

const url = isDev 
? import.meta.env.VITE_BACKEND_URL 
: import.meta.env.VITE_URL_HOST;

export const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
},
 (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((res) => res, (error) => {
    if (error.response?.status === 401) {
        // Invalid / expired token
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect
        window.location.href = "/login";
    }

    return Promise.reject(error);
})