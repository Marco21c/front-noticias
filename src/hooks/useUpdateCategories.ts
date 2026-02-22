import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/category.services";
import type { ICategory } from "@/types/Category.type";

interface UpdateCategoryParams {
  id: string;
  category: Partial<ICategory>;
}

/**
 * Hook para crear una nueva categoria.
 * Invalida automaticamente el cache de categorias al completarse exitosamente.
 * 
 * @returns {Object} Objeto mutate, isPending, isError, error y otras propiedades de useMutation
 * @example
 * const { mutate } = useCreateCategory();
 * mutate({ name: 'Tecnologia', isActive: true });
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
 * Hook para actualizar una categoria existente.
 * Invalida automaticamente el cache de categorias al completarse exitosamente.
 * 
 * @returns {Object} Objeto mutate, isPending, isError, error y otras propiedades de useMutation
 * @example
 * const { mutate } = useUpdateCategory();
 * mutate({ id: '123', category: { name: 'Nuevo nombre' } });
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
 * Hook para eliminar una categoria.
 * Invalida automaticamente el cache de categorias al completarse exitosamente.
 * 
 * @returns {Object} Objeto mutate, isPending, isError, error y otras propiedades de useMutation
 * @example
 * const { mutate } = useDeleteCategory();
 * mutate('123');
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
