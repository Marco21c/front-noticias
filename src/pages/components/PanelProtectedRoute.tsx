import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/User.type';

interface PanelProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

/**
 * Componente de ruta protegida para el panel de administracion.
 * Verifica que el usuario este autenticado y, opcionalmente, que tenga
 * uno de los roles permitidos para acceder a la ruta.
 * 
 * @component
 * @param {PanelProtectedRouteProps} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componente a renderizar si tiene acceso
 * @param {UserRole[]} [props.allowedRoles] - Roles permitidos para acceder
 * @returns {JSX.Element} Componente hijo, pantalla de carga, redireccion o mensaje de error
 * 
 * @example
 * <PanelProtectedRoute allowedRoles={['admin', 'editor']}>
 *   <DashboardPanel />
 * </PanelProtectedRoute>
 */
export function PanelProtectedRoute({ children, allowedRoles }: PanelProtectedRouteProps) {
    const { isAuthenticated, isLoading, hasRole } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/panel" replace />;
    }

    if (allowedRoles && !hasRole(allowedRoles)) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Acceso Denegado
                    </h2>
                    <p className="text-gray-600">
                        No tienes permisos para acceder a esta pagina
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
