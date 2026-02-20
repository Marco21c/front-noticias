import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.services";
import type { ICategory } from "@/types/Category.type";

export const useGetCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
