import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { USER_ROLES, type UserRole, type IUser } from "@/types/User.type";

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

/**
 * Proveedor de contexto de autenticacion para la aplicacion.
 * Gestiona el estado de autenticacion del usuario, token y permisos.
 * Persiste la sesion en localStorage y valida el estado al iniciar.
 * 
 * @component
 * @param {AuthProviderProps} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendran acceso al contexto
 * @returns {JSX.Element} Proveedor de contexto de autenticacion
 * 
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    /**
     * Cierra la sesion del usuario actual.
     * Elimina el token y datos de usuario del localStorage y resetea el estado.
     */
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    /**
     * Verifica el estado de autenticacion desde localStorage.
     * Valida que el rol del usuario sea valido y restaura la sesion.
     */
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

    /**
     * Inicia sesion con el token y datos de usuario proporcionados.
     * Persiste la sesion en localStorage y actualiza el estado.
     * 
     * @param {string} newToken - Token de autenticacion JWT
     * @param {IUser} userData - Datos del usuario autenticado
     */
    const login = useCallback((newToken: string, userData: IUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    /**
     * Verifica si el usuario actual tiene uno de los roles especificados.
     * 
     * @param {UserRole[]} roles - Lista de roles a verificar
     * @returns {boolean} True si el usuario tiene uno de los roles
     */
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

/**
 * Hook para acceder al contexto de autenticacion.
 * Debe usarse dentro de un AuthProvider.
 * 
 * @returns {AuthContextType} Objeto con estado y funciones de autenticacion
 * @throws {Error} Si se usa fuera de AuthProvider
 * 
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
}
