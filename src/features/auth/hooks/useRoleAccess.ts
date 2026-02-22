import { useAuth } from '@/features/auth/context/AuthContext';
import { USER_ROLES } from '@/features/auth/types/User.type';

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
