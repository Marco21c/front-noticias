import { useQuery } from "@tanstack/react-query";
import { getNewsByCategory, getNews, getNewById, searchNews } from "@/features/news/api/news.services";
import type { INews } from "@/features/news/types/News.type.ts";

/**
 * Hook principal para solicitar todas las noticias genéricamente publicadas al feed.
 * Pide hasta 50 resultados para abastecer las portadas complejas.
 * @returns UseQueryResult administrado por TanStack
 */
export const useGetNews = (limit: number = 50) => {
  return useQuery<INews[]>({
    queryKey: ['news', limit],
    queryFn: () => getNews(limit),
  })
};

/**
 * Hook condicional para obtener noticias vinculadas a un ID de categoría.
 * Solo emite requests cuando el categoryId existe.
 * @param {string} [categoryId] Target param
 * @returns UseQueryResult con payload filtrado
 */
export const useGetNewsPorCategories = (categoryId?: string) => {
  return useQuery<INews[]>({
    queryKey: ['news', categoryId],
    queryFn: () => getNewsByCategory(categoryId!),
    enabled: !!categoryId
  });
};

/**
 * Recuperación directa del documento completo de una Noticia mediante Mongo ID.
 * Activo solo cuando se facilita un ID no vacío.
 * @param {string} [id] ID para la URL request.
 * @returns UseQueryResult con objeto DTO Noticia.
 */
export const useGetNew = (id?: string) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewById(id!),
    enabled: !!id,
  });
};

interface UseSearchNewsOptions {
  enabled?: boolean;
}

/**
 * Hook especial para ejecutar y atrapar búsquedas tipo regex tolerantes a acentos en el backend.
 * Guarda caché temporal de 5 minutos sobre la Query.
 * @param {string} query Término escrito en el input
 * @param {UseSearchNewsOptions} [options] Banderas para activar asíncronamente la query
 * @returns UseQueryResult cargado de INews[]
 */
export const useSearchNews = (
  query: string,
  options?: UseSearchNewsOptions
) => {
  return useQuery<INews[], Error>({
    queryKey: ["search-news", query],
    queryFn: () => searchNews(query),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
