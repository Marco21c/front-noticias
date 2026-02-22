import { useQuery } from "@tanstack/react-query";
import { getNewsByCategory, getNews, getNewById, searchNews } from "@/services/news.services";
import type { INews } from "@/types/News.type";

/**
 * Hook para obtener todas las noticias del sistema.
 * Utiliza React Query para cache y manejo de estado.
 * 
 * @returns {Object} Objeto con data, isLoading, isError y otras propiedades de React Query
 * @example
 * const { data, isLoading, isError } = useGetNews();
 */
export const useGetNews = () => {
  return useQuery<INews[]>({
    queryKey: ['news'],
    queryFn: getNews,
  })
};

/**
 * Hook para obtener noticias filtradas por categoria.
 * La query solo se ejecuta cuando category tiene un valor.
 * 
 * @param {string} category - Nombre de la categoria a filtrar
 * @returns {Object} Objeto con data, isLoading, isError y otras propiedades de React Query
 * @example
 * const { data } = useGetNewsPorCategories('technology');
 */
export const useGetNewsPorCategories = (category: string) => {
  return useQuery<INews[]>({
    queryKey: ['news', category],
    queryFn: () => getNewsByCategory(category),
    enabled: !!category 
  })
};

/**
 * Hook para obtener una noticia por su ID.
 * La query solo se ejecuta cuando el ID esta definido.
 * 
 * @param {string} [id] - ID de la noticia a obtener
 * @returns {Object} Objeto con data, isLoading, isError y otras propiedades de React Query
 * @example
 * const { data: news } = useGetNew('123');
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
 * Hook para buscar noticias por termino de busqueda.
 * Incluye configuracion de stale time y retry limitado.
 * 
 * @param {string} query - Termino de busqueda
 * @param {UseSearchNewsOptions} [options] - Opciones adicionales
 * @param {boolean} [options.enabled=true] - Si la query debe ejecutarse
 * @returns {Object} Objeto con data, isLoading, isError, error y otras propiedades de React Query
 * @example
 * const { data, isLoading } = useSearchNews('tecnologia', { enabled: true });
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
