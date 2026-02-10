export type UserRole = 'superadmin' | 'admin' | 'editor' | 'user';

export const USER_ROLES = {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    EDITOR: 'editor',
    USER: 'user'
} as const;

// Interfaz del usuario en el backend (con _id)
export interface IUserBackend {
    _id: string;
    email: string;
    password?: string;
    role: UserRole;
    name: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
}

// Interfaz del usuario en el frontend (con id)
export interface IUser {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
}