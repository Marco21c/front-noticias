import { apiClient } from '../lib/axios';
import type { ICategory } from '@/types/Category.type';

/**
 * Obtiene todas las categorias del sistema.
 * 
 * @returns {Promise<ICategory[]>} Lista de todas las categorias
 * @throws {Error} Error de red o del servidor
 */
export const getCategories = async (): Promise<ICategory[]> => {
    const { data } = await apiClient.get('/categories');
    return data.data;
};

/**
 * Obtiene una categoria por su ID.
 * 
 * @param {string} id - ID de la categoria a obtener
 * @returns {Promise<ICategory>} Categoria encontrada
 * @throws {Error} Error si la categoria no existe
 */
export const getCategoryById = async (id: string): Promise<ICategory> => {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data.data;
};

/**
 * Crea una nueva categoria en el sistema.
 * 
 * @param {Partial<ICategory>} category - Datos de la nueva categoria
 * @returns {Promise<ICategory>} Categoria creada con su ID asignado
 * @throws {Error} Error de validacion o del servidor
 */
export const createCategory = async (category: Partial<ICategory>): Promise<ICategory> => {
    const { data } = await apiClient.post('/categories', category);
    return data.data;
};

/**
 * Actualiza una categoria existente.
 * 
 * @param {string} id - ID de la categoria a actualizar
 * @param {Partial<ICategory>} category - Nuevos datos de la categoria
 * @returns {Promise<ICategory>} Categoria actualizada
 * @throws {Error} Error de validacion o del servidor
 */
export const updateCategory = async (id: string, category: Partial<ICategory>): Promise<ICategory> => {
    const { data } = await apiClient.put(`/categories/${id}`, category);
    return data.data;
};

/**
 * Elimina una categoria del sistema.
 * 
 * @param {string} id - ID de la categoria a eliminar
 * @returns {Promise<void>}
 * @throws {Error} Error si la categoria no existe o tiene noticias asociadas
 */
export const deleteCategory = async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
};
