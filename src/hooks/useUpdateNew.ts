import type { INewsCreate } from "@/types/News.type";
import { deleteNew, postNew, updateNew } from "@/services/news.services";
import { useQueryClient, useMutation } from "@tanstack/react-query";

/**
 * Hook para crear una nueva noticia.
 * Invalida automaticamente el cache de noticias al completarse exitosamente.
 * 
 * @returns {Object} Objeto mutate, isPending, isError, error y otras propiedades de useMutation
 * @example
 * const { mutate, isPending } = useCreateNew();
 * mutate({ title: 'Nueva noticia', summary: '...', content: '...', category: '123' });
 */
export const useCreateNew = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    }
  });
};

/**
 * Hook para actualizar una noticia existente.
 * Invalida el cache de noticias general y el de la noticia especifica.
 * 
 * @returns {Object} Objeto mutate, isPending, isError, error y otras propiedades de useMutation
 * @example
 * const { mutate } = useUpdateNew();
 * mutate({ id: '123', payload: { title: 'Titulo actualizado', ... } });
 */
export const useUpdateNew = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: INewsCreate }) =>
      updateNew({ id, payload }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["news"] });
      qc.invalidateQueries({ queryKey: ["news", id] });
    },
  });
};

/**
 * Hook para eliminar una noticia.
 * Invalida automaticamente el cache de noticias al completarse exitosamente.
 * 
 * @returns {Object} Objeto mutate, isPending, isError, error y otras propiedades de useMutation
 * @example
 * const { mutate } = useDeleteNew();
 * mutate('123');
 */
export const useDeleteNew = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteNew,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
};
