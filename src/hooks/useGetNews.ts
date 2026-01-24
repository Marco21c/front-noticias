import { useQuery} from "@tanstack/react-query";
import { getNewsByCategory, getNews } from "@/services/news.services";
import type { INews } from "../interfaces/News.type";

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
          enabled: !!category  //Impide mandar categoria vacia
      })    
}
