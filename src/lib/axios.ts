import axios from "axios";

const isDev = import.meta.env.MODE === "development";

const url = isDev 
? import.meta.env.VITE_BACKEND_URL 
: import.meta.env.VITE_URL_HOST;

/**
 * Cliente Axios configurado para comunicarse con la API backend.
 * Incluye interceptores para autenticacion automatica y manejo de errores.
 * 
 * @example
 * import { apiClient } from '@/lib/axios';
 * const response = await apiClient.get('/news');
 */
export const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de solicitud que agrega el token de autenticacion
 * a todas las peticiones salientes si existe en localStorage.
 */
apiClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
},
 (error) => Promise.reject(error)
);

/**
 * Interceptor de respuesta que maneja errores de autenticacion.
 * Si la respuesta es 401 (token invalido o expirado), limpia
 * el almacenamiento local y redirige al login.
 */
apiClient.interceptors.response.use((res) => res, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = "/login";
    }

    return Promise.reject(error);
})
