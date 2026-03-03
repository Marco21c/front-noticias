import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "@/features/categories/api/category.services";
import type { ICategory } from "@/features/categories/types/Category.type.ts";

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
};
