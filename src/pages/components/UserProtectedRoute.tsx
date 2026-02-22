import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface UserProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * Componente de ruta protegida para paginas de usuarios autenticados.
 * Redirige al login si el usuario no esta autenticado.
 * 
 * @component
 * @param {UserProtectedRouteProps} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componente a renderizar si esta autenticado
 * @returns {JSX.Element} Componente hijo, pantalla de carga o redireccion
 * 
 * @example
 * <UserProtectedRoute>
 *   <ProfilePage />
 * </UserProtectedRoute>
 */
export function UserProtectedRoute({ children }: UserProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
