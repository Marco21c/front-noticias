/**
 * Interfaz que representa una suscripcion al newsletter.
 * Los usuarios pueden suscribirse para recibir actualizaciones
 * de las categorias de su interes.
 */
export interface INewsletter {
  /** Identificador unico de la suscripcion */
  _id: string;
  /** ID del usuario suscrito */
  user: string;
  /** IDs de las categorias de interes del usuario */
  preferredCategories: string[];
  /** Indica si la suscripcion esta activa */
  isActive: boolean;
  /** Fecha de creacion de la suscripcion */
  createdAt?: Date;
  /** Fecha de ultima actualizacion */
  updatedAt?: Date;
}

/**
 * Interfaz para la solicitud de suscripcion al newsletter.
 */
export interface SubscribeRequest {
  /** IDs de las categorias de interes */
  preferredCategories: string[];
}

/**
 * Interfaz para actualizar las preferencias del newsletter.
 */
export interface UpdatePreferencesRequest {
  /** Nuevos IDs de categorias de interes */
  preferredCategories: string[];
}
