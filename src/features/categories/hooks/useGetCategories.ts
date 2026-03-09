import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "@/features/categories/api/category.services";
import type { ICategory } from "@/features/categories/types/Category.type.ts";

/**
 * Hook de React Query para obtener el caché global de todas las categorías disponibles.
 * @returns Instancia de UseQueryResult con `data` (ICategory[])
 */
export const useGetCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

/**
 * Hook de React Query enfocado a recuperar datos de una sola categoría de forma asíncrona.
 * Solo se ejecuta si el param `id` es un string válido (truthy).
 * @param {string} id Referencia mongo
 * @returns Instancia de UseQueryResult para ICategory
 */
export const useGetCategoryById = (id: string) => {
  return useQuery<ICategory>({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};
