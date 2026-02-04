import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { UserRole } from "@/interfaces/User.roles"; // Importar el enum

// Definicion de tipos
interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: UserRole; // Cambiar de string a UserRole
}

interface AuthContextType {
    // Estados
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Metodos
    login: (token: string, userData: User) => void;
    logout: () => void;
    checkAuth: () => void;
    hasRole: (roles: UserRole[]) => boolean; // Nuevo método
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
                // Si hay datos guardados, restauramos la sesion
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error al verificar autenticacion:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Nueva función para verificar roles
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
        hasRole, // Agregar nuevo método
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