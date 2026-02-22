/**
 * Roles de usuario disponibles en el sistema.
 * - superadmin: Acceso total al sistema
 * - admin: Administrador con permisos elevados
 * - editor: Puede crear y editar contenido
 * - user: Usuario estandar con acceso de lectura
 */
export type UserRole = 'superadmin' | 'admin' | 'editor' | 'user';

/**
 * Constantes de roles de usuario para uso en todo el sistema.
 * Proporciona acceso tipado a los valores de roles.
 */
export const USER_ROLES = {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    EDITOR: 'editor',
    USER: 'user'
} as const;

/**
 * Interfaz del usuario tal como se almacena en el backend.
 * Utiliza el campo _id como identificador (formato MongoDB).
 */
export interface IUserBackend {
    /** Identificador unico en formato MongoDB */
    _id: string;
    /** Direccion de correo electronico */
    email: string;
    /** Contrasena hasheada (opcional, no se envia al frontend) */
    password?: string;
    /** Rol del usuario en el sistema */
    role: UserRole;
    /** Nombre del usuario */
    name: string;
    /** Apellido del usuario */
    lastName: string;
    /** Fecha de creacion del registro */
    createdAt?: string;
    /** Fecha de ultima actualizacion */
    updatedAt?: string;
}

/**
 * Interfaz del usuario para uso en el frontend.
 * Transforma _id a id para consistencia con el resto del sistema.
 */
export interface IUser {
    /** Identificador unico del usuario */
    id: string;
    /** Direccion de correo electronico */
    email: string;
    /** Rol del usuario en el sistema */
    role: UserRole;
    /** Nombre del usuario */
    name: string;
    /** Apellido del usuario */
    lastName: string;
    /** Fecha de creacion del registro */
    createdAt?: string;
    /** Fecha de ultima actualizacion */
    updatedAt?: string;
}
