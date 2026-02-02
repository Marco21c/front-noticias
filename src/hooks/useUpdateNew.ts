import type { INewsCreate } from "@/interfaces/News.type";
import { deleteNew, postNew, updateNew } from "@/services/news.services";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useCreateNew = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: postNew,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['news']});
      } 
   });
}

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

export const useDeleteNew = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteNew,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
};