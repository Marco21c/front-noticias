
import { useAuth } from '@/contexts/AuthContext';
import { USER_ROLES } from '../types/User.type'; //

export function useRoleAccess() {
    const { user, hasRole } = useAuth();

    return {
        // Checks individuales por rol
        isSuperAdmin: hasRole([USER_ROLES.SUPERADMIN]),
        isAdmin: hasRole([USER_ROLES.ADMIN]),
        isEditor: hasRole([USER_ROLES.EDITOR]),
        isUser: hasRole([USER_ROLES.USER]),
        
        // Permisos específicos por funcionalidad
        canManageUsers: hasRole([USER_ROLES.SUPERADMIN]),

        // TODO:
        // canApproveNews: hasRole([USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]), => Las aprobaciones de las noticias, unicamente puedan hacerla los roles de ADMIN
        // AddNews: hasRole([USER_ROLES.EDITOR, USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]),
        // UpdateNews: hasRole([USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN]),
        
        // Info del usuario actual
        userRole: user?.role
    };
}
