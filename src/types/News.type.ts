/**
 * Estados posibles de una noticia en el sistema.
 * - draft: Borrador, aun en edicion
 * - in_review: En revision por un administrador
 * - approved: Aprobada para publicacion
 * - published: Publicada y visible
 * - rejected: Rechazada por el administrador
 */
export type NewsStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'rejected';

/**
 * Variantes visuales disponibles para mostrar una noticia.
 * - highlighted: Noticia destacada con mayor prominencia visual
 * - featured: Noticia principal de una seccion
 * - default: Visualizacion estandar
 */
export type NewsVariant = 'highlighted' | 'featured' | 'default';

/**
 * Interfaz que representa una noticia completa en el sistema.
 * Contiene toda la informacion necesaria para mostrar y gestionar una noticia.
 */
export interface INews {
  /** Identificador unico de la noticia */
  id: string;
  /** Titulo de la noticia */
  title: string;
  /** Slug URL-friendly para rutas */
  slug: string;
  /** Resumen o bajada de la noticia */
  summary: string;
  /** Contenido completo de la noticia */
  content: string;
  /** Palabras clave o puntos destacados */
  highlights: string[];
  /** Informacion del autor de la noticia */
  author: { name?: string };
  /** Categoria a la que pertenece la noticia */
  category: { id?: string; name?: string };
  /** URL de la imagen principal */
  mainImage?: string;
  /** Fuente de la informacion */
  source?: string;
  /** Variante visual de la noticia */
  variant: NewsVariant;
  /** Estado actual de la noticia */
  status: NewsStatus;
  /** Fecha de publicacion */
  publicationDate?: string | null;
  /** Fecha de creacion del registro */
  createdAt?: Date;
  /** Fecha de ultima actualizacion */
  updatedAt?: Date;
}

/**
 * Interfaz para crear una nueva noticia.
 * Contiene los campos obligatorios y opcionales para el registro inicial.
 */
export interface INewsCreate {
  /** Titulo de la noticia */
  title: string;
  /** Slug URL-friendly (se genera automaticamente si no se proporciona) */
  slug?: string;
  /** Resumen o bajada de la noticia */
  summary: string;
  /** Contenido completo de la noticia */
  content: string;
  /** Palabras clave o puntos destacados */
  highlights?: string[];
  /** ID de la categoria */
  category: string;
  /** URL de la imagen principal */
  mainImage?: string;
  /** Fuente de la informacion */
  source?: string | null;
  /** Variante visual de la noticia */
  variant?: NewsVariant;
}
