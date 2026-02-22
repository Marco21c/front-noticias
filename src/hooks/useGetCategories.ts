import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "@/services/category.services";
import type { ICategory } from "@/types/Category.type";

export const useGetCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery<ICategory>({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id, 
  });
}