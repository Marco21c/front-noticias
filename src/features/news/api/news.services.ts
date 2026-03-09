import type { INews, INewsCreate } from '@/features/news/types/News.type.ts';
import { apiClient } from '@/shared/lib/axios';

/**
 * Obtiene todas las noticias disponibles y publicadas del backend.
 * @param {number} [limit=50] Límite de resultados a traer
 * @returns {Promise<INews[]>} Array de noticias
 */
export const getNews = async (limit: number = 50): Promise<INews[]> => {
    const { data } = await apiClient.get('/news', { params: { limit } });
    return data.data.items;
};

const buildFormData = (data: Partial<INewsCreate>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'highlights' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'mainImage' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'mainImage' && typeof value === 'string') {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  return formData;
};

/**
 * Crea una nueva noticia en estado borrador.
 * @param {INewsCreate} newData Datos del formulario del redactor
 * @returns {Promise<INews>} La nueva noticia generada
 */
export const postNew = async (newData: INewsCreate): Promise<INews> => {
    const payload = {
        ...newData,
        variant: newData.variant || 'default',
    };

    const formData = buildFormData(payload);

    const { data } = await apiClient.post("/news", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data.data;
};

/**
 * Filtra y obtiene noticias según su categoría específica.
 * @param {string} categoryId Mongo ID de la categoria
 * @returns {Promise<INews[]>} Array de noticias vinculadas
 */
export const getNewsByCategory = async (
  categoryId: string
): Promise<INews[]> => {
  const { data } = await apiClient.get('/news/category', {
    params: { category: categoryId }
  });
  return data.data;
};

/**
 * Busca el contenido o detalle individual de una noticia por ID.
 * @param {string} id ID unico de la noticia
 * @returns {Promise<INews>}
 */
export const getNewById = async (id: string): Promise<INews> => {
    const { data } = await apiClient.get(`/news/${id}`);
    return data.data;
};

/**
 * Actualiza el bloque de datos de cualquier noticia existente.
 * @param {object} params ID y payload a actualizar
 * @returns {Promise<INews>}
 */
export const updateNew = async ({ id, payload }: {
    id: string;
    payload: INewsCreate;
}): Promise<INews> => {
    const formData = buildFormData(payload);
    const { data } = await apiClient.put(`/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data.data;
};

/**
 * Borra permanentemente una noticia usando su ID.
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteNew = async (id: string): Promise<void> => {
    await apiClient.delete(`/news/${id}`);
};

/**
 * Ejecuta búsqueda inteligente por coincidencias en el título u otros patrones.
 * @param {string} query Palabra introducida por el usuario
 * @returns {Promise<INews[]>} Listado de hallazgos
 */
export const searchNews = async (query: string): Promise<INews[]> => {
    const response = await apiClient.get(
        "/news/search",
        { params: { q: query } }
    );
    return response.data.data.items;
};
