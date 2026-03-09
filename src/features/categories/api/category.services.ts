import { apiClient } from '@/shared/lib/axios';
import type { ICategory } from '@/features/categories/types/Category.type.ts';

/**
 * Recupera el listado completo de categorías desde el backend.
 * @returns {Promise<ICategory[]>} Arreglo de categorías
 */
export const getCategories = async (): Promise<ICategory[]> => {
    const { data } = await apiClient.get('/categories');
    return data.data;
};

/**
 * Recupera una categoría específica utilizando su ID.
 * @param {string} id ID único de la categoría.
 * @returns {Promise<ICategory>} Promesa con la categoría encontrada.
 */
export const getCategoryById = async (id: string): Promise<ICategory> => {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data.data;
};

/**
 * Envía una solicitud de creación de nueva categoría.
 * @param {Partial<ICategory>} category Datos de la nueva categoría
 * @returns {Promise<ICategory>} Promesa con la categoría creada.
 */
export const createCategory = async (category: Partial<ICategory>): Promise<ICategory> => {
    const { data } = await apiClient.post('/categories', category);
    return data.data;
};

/**
 * Envía una solicitud para actualizar una categoría específica.
 * @param {string} id ID de la categoría
 * @param {Partial<ICategory>} category Parámetros a actualizar
 * @returns {Promise<ICategory>} Categoría actualizada desde el back.
 */
export const updateCategory = async (id: string, category: Partial<ICategory>): Promise<ICategory> => {
    const { data } = await apiClient.put(`/categories/${id}`, category);
    return data.data;
};

/**
 * Ejecuta la eliminación física de una categoría en la DB.
 * @param {string} id ID de la categoría
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
};
