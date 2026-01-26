import { postNew } from "@/services/news.services";
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