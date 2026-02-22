import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "@/services/category.services";
import type { ICategory } from "@/types/Category.type";

/**
 * Hook para obtener todas las categorias del sistema.
 * Utiliza React Query para cache y manejo de estado.
 * 
 * @returns {Object} Objeto con data, isLoading, isError y otras propiedades de React Query
 * @example
 * const { data: categories, isLoading } = useGetCategories();
 */
export const useGetCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

/**
 * Hook para obtener una categoria por su ID.
 * La query solo se ejecuta cuando el ID esta definido.
 * 
 * @param {string} id - ID de la categoria a obtener
 * @returns {Object} Objeto con data, isLoading, isError y otras propiedades de React Query
 * @example
 * const { data: category } = useGetCategoryById('123');
 */
export const useGetCategoryById = (id: string) => {
  return useQuery<ICategory>({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
