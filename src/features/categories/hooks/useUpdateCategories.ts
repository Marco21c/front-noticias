import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/features/categories/api/category.services";
import type { ICategory } from "@/features/categories/types/Category.type.ts";

interface UpdateCategoryParams {
  id: string;
  category: Partial<ICategory>;
}

/**
 * Construye una mutación React Query para dar de alta una categoría.
 * Invalida el caché de la llave `categories` forzando refetch una vez completado exitosamente.
 * @returns UseMutationResult con función asíncrona inyectada
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: Partial<ICategory>) =>
      createCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/**
 * Construye una mutación para editar información de una categoría cargada.
 * @returns UseMutationResult para ejecutar { id, categoryPayload } asíncronamente
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: UpdateCategoryParams) =>
      updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/**
 * Construye una mutación dedicada de baja física para categorías.
 * Causa Side-Effects en caché invalidando llave `categories`.
 * @returns UseMutationResult para un método Delete.
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
