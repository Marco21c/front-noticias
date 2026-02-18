import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.services";

export interface Category {
  _id: string;
  name: string;
}

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};


