// hooks/useRoleAccess.ts
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/interfaces/User.roles';

export function useRoleAccess() {
    const { user, hasRole } = useAuth();

    return {
        isSuperAdmin: hasRole([UserRole.SUPERADMIN]),
        isAdmin: hasRole([UserRole.ADMIN]),
        isEditor: hasRole([UserRole.EDITOR]),
        canManageUsers: hasRole([UserRole.SUPERADMIN]),
        // canApproveNews: hasRole([UserRole.ADMIN, UserRole.SUPERADMIN]),
        // canCreateNews: hasRole([UserRole.EDITOR]),
        userRole: user?.role
    };
}