import { useQuery} from "@tanstack/react-query";
import { getNews } from "@/services/news.services";
import type { INews } from "../interfaces/News.type";

export const useGetNews = () =>
  useQuery<INews[]>({
    queryKey: ["news"],
    //podriamos ordenar las noticias antes de mandarlas a las vistas
    queryFn: getNews,
  })

 // Los otros tipos de get 
export const useGetNewsxId = () => {}