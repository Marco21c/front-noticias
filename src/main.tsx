import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from "./components/ui/sonner.tsx";
import './index.css';
import App from './App.tsx';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Configuracion de dayjs para usar locale en espanol.
 */
dayjs.locale("es");

/**
 * Cliente de React Query para gestionar el cache y estado de las queries.
 */
const queryClient = new QueryClient();

/**
 * Punto de entrada principal de la aplicacion.
 * Configura los proveedores globales (QueryClientProvider, Toaster)
 * y monta el componente raiz App dentro de StrictMode.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <Toaster/>
    </QueryClientProvider>
  </StrictMode>,
)
