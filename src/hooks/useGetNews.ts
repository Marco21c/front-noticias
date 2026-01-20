import { useQuery} from "@tanstack/react-query";
import { getNews } from "@/services/news.services";
import type { INews } from "../interfaces/News.type";

export const useGetNews = () => {
  return useQuery<INews[]>({
    queryKey: ['news'],
    queryFn: getNews,
  })
}

 // Los otros tipos de get 
export const useGetNewsxId = () => {}