// components/UserProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface UserProtectedRouteProps {
    children: React.ReactNode;
}

export function UserProtectedRoute({ children }: UserProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    // Mostrar loading mientras verifica autenticación
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    // Si no está autenticado, redirigir al login del sitio público
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}