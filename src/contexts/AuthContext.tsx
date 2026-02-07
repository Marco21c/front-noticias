import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { USER_ROLES, type UserRole, type IUser } from "@/types/User.type"; 

// Definicion de tipos
interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: UserRole;
}

interface AuthContextType {
    user: IUser | null;  // 👈 Usa el tipo importado
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
    // Estados locales que alimentan el contexto
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Funcion para hacer login
    const login = (newToken: string, userData: User) => {
        // Guardar token en localStorage para persistencia
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Actualizar estados
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Funcion para hacer logout
    const logout = () => {
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Resetear el estado
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    // Funcion para verificar si el usuario esta autenticado
    const checkAuth = () => {
        setIsLoading(true);

        try {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (savedToken && savedUser) {
                const parsedUser = JSON.parse(savedUser) as User;
                
                const validRoles = Object.values(USER_ROLES);
                if (!validRoles.includes(parsedUser.role)) {
                    console.warn('Rol inválido detectado en localStorage');
                    logout();
                    return;
                }

                // Si hay datos guardados y válidos, restauramos la sesión
                setToken(savedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error al verificar autenticación:', error);
            // Si hay error parseando, limpiamos todo
            logout();
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para verificar roles
    const hasRole = (roles: UserRole[]): boolean => {
        return user ? roles.includes(user.role) : false;
    };

    // Efecto para verificar autenticacion al montar la aplicacion
    useEffect(() => {
        checkAuth();
    }, []);

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

// Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
}