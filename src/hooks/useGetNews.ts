import { useQuery} from "@tanstack/react-query";
import { getNews } from "@/services/news.services";
import type { News } from "../types/News.type";


export const useGetNews = () =>
  useQuery<News[]>({
    queryKey: ["news"],
    queryFn: getNews,
  })

 // Los otros tipos de get 
export const useGetNewsxId = () => {}