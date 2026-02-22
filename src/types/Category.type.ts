/**
 * Interfaz que representa una categoria de noticias.
 * Las categorias permiten organizar y filtrar las noticias por tematica.
 */
export interface ICategory {
  /** Identificador unico de la categoria */
  id: string;
  /** Nombre de la categoria */
  name: string;
  /** Descripcion opcional de la categoria */
  description?: string;
  /** Indica si la categoria esta activa y visible */
  isActive: boolean;
  /** Fecha de creacion del registro */
  createdAt?: Date;
  /** Fecha de ultima actualizacion */
  updatedAt?: Date;
}
