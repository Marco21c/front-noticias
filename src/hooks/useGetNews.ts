import { useQuery} from "@tanstack/react-query";
import { getNewsByCategory, getNews, getNewById } from "@/services/news.services";
import type { INews } from "../types/News.type";

export const useGetNews = () => {
  return useQuery<INews[]>({
    queryKey: ['news'],
    queryFn: getNews,
  })
}
 
export const useGetNewsPorCategories = (category:string) => {
      return useQuery<INews[]>({
          queryKey: ['news', category],
          queryFn: () => getNewsByCategory(category as string),
          enabled: !!category 
      })    
}

export const useGetNew = (id?: string) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewById(id!),
    enabled: !!id,
  });
};
