import { useAuth } from '@/contexts/AuthContext';
import { USER_ROLES } from '../types/User.type';

/**
 * Hook para verificar permisos y roles del usuario autenticado.
 * Proporciona funciones de conveniencia para verificar acceso a funcionalidades.
 * 
 * @returns {Object} Objeto con:
 *   - isSuperAdmin: True si el usuario es superadmin
 *   - isAdmin: True si el usuario es admin
 *   - isEditor: True si el usuario es editor
 *   - isUser: True si el usuario tiene rol user
 *   - canManageUsers: True si el usuario puede gestionar usuarios
 *   - userRole: Rol del usuario actual o undefined
 * 
 * @example
 * const { isAdmin, canManageUsers } = useRoleAccess();
 * if (canManageUsers) { ... }
 */
export function useRoleAccess() {
    const { user, hasRole } = useAuth();

    return {
        isSuperAdmin: hasRole([USER_ROLES.SUPERADMIN]),
        isAdmin: hasRole([USER_ROLES.ADMIN]),
        isEditor: hasRole([USER_ROLES.EDITOR]),
        isUser: hasRole([USER_ROLES.USER]),
        
        canManageUsers: hasRole([USER_ROLES.SUPERADMIN]),

        userRole: user?.role
    };
}
