export enum UserRole {
    SUPERADMIN = 'superadmin',  // Crea usuarios, gestiona todo => Soporte
    ADMIN = 'admin',             // Aprueba/rechaza noticias de editores => Jefe de redaccion
    EDITOR = 'editor',           // Crea/edita noticias => Periodista
    USER = 'user'                // Solo lectura => Lector
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}