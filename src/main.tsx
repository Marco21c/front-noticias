import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from "@/components/ui/toaster";
import './index.css';
import App from './App.tsx';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
dayjs.locale("es");

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <Toaster/>
    </QueryClientProvider>
  </StrictMode>,
)
