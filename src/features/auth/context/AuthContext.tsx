import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { USER_ROLES, type UserRole, type IUser } from "@/features/auth/types/User.type.ts";

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, userData: IUser) => void;
    logout: () => void;
    checkAuth: () => void;
    hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const checkAuth = useCallback(() => {
        setIsLoading(true);

        try {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (savedToken && savedUser) {
                const parsedUser = JSON.parse(savedUser) as IUser;
                
                const validRoles = Object.values(USER_ROLES);
                if (!validRoles.includes(parsedUser.role)) {
                    logout();
                    return;
                }

                setToken(savedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch {
            logout();
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, [logout]);

    const login = useCallback((newToken: string, userData: IUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const hasRole = useCallback((roles: UserRole[]): boolean => {
        return user ? roles.includes(user.role) : false;
    }, [user]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        checkAuth,
        hasRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
}
