import { useQuery } from "@tanstack/react-query";
import { getNewsByCategory, getNews, getNewById, searchNews } from "@/services/news.services";
import type { INews } from "@/types/News.type";

export const useGetNews = () => {
  return useQuery<INews[]>({
    queryKey: ['news'],
    queryFn: getNews,
  })
}

export const useGetNewsPorCategories = (category: string) => {
  return useQuery<INews[]>({
    queryKey: ['news', category],
    queryFn: () => getNewsByCategory(category),
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

interface UseSearchNewsOptions {
  enabled?: boolean;
}

export const useSearchNews = (
  query: string,
  options?: UseSearchNewsOptions
) => {
  return useQuery<INews[], Error>({
    queryKey: ["search-news", query],
    queryFn: () => searchNews(query),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};