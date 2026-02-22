import type { INews, INewsCreate } from '@/types/News.type';
import { apiClient } from '../lib/axios';

/**
 * Obtiene todas las noticias del sistema.
 * 
 * @returns {Promise<INews[]>} Lista de todas las noticias
 * @throws {Error} Error de red o del servidor
 */
export const getNews = async (): Promise<INews[]> => {
    const { data } = await apiClient.get('/news');
    return data.data;
};

/**
 * Crea una nueva noticia en el sistema.
 * Genera automaticamente el slug a partir del titulo.
 * 
 * @param {INewsCreate} newData - Datos de la nueva noticia
 * @returns {Promise<INews>} Noticia creada con su ID asignado
 * @throws {Error} Error de validacion o del servidor
 */
export const postNew = async (newData: INewsCreate): Promise<INews> => {
    const slug = newData.title.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    
    const payload = {
        ...newData,
        slug,
        variant: newData.variant || 'default',
    };
    
    const { data } = await apiClient.post("/news", payload);
    return data.data;
};

/**
 * Obtiene las noticias de una categoria especifica.
 * 
 * @param {string} category - Nombre de la categoria a filtrar
 * @returns {Promise<INews[]>} Lista de noticias de la categoria
 * @throws {Error} Error de red o del servidor
 */
export const getNewsByCategory = async (category: string): Promise<INews[]> => {
    const { data } = await apiClient.get('/news/category', {
        params: { category }
    });
    return data.data;
};

/**
 * Obtiene una noticia por su ID.
 * 
 * @param {string} id - ID de la noticia a obtener
 * @returns {Promise<INews>} Noticia encontrada
 * @throws {Error} Error si la noticia no existe
 */
export const getNewById = async (id: string): Promise<INews> => {
    const { data } = await apiClient.get(`/news/${id}`);
    return data.data;
};

/**
 * Actualiza una noticia existente.
 * 
 * @param {Object} params - Parametros de actualizacion
 * @param {string} params.id - ID de la noticia a actualizar
 * @param {INewsCreate} params.payload - Nuevos datos de la noticia
 * @returns {Promise<INews>} Noticia actualizada
 * @throws {Error} Error de validacion o del servidor
 */
export const updateNew = async ({ id, payload }: {
    id: string;
    payload: INewsCreate;
}): Promise<INews> => {
    const { data } = await apiClient.put(`/news/${id}`, payload);
    return data.data;
};

/**
 * Elimina una noticia del sistema.
 * 
 * @param {string} id - ID de la noticia a eliminar
 * @returns {Promise<void>}
 * @throws {Error} Error si la noticia no existe o no se puede eliminar
 */
export const deleteNew = async (id: string): Promise<void> => {
    await apiClient.delete(`/news/${id}`);
};

/**
 * Busca noticias que coincidan con un termino de busqueda.
 * 
 * @param {string} query - Termino de busqueda
 * @returns {Promise<INews[]>} Lista de noticias que coinciden con la busqueda
 * @throws {Error} Error de red o del servidor
 */
export const searchNews = async (query: string): Promise<INews[]> => {
  const response = await apiClient.get(
    "/news/search",
    { params: { q: query } }
  );
  return response.data.data;
};
