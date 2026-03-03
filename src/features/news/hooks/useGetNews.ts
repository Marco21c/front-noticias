import { useQuery } from "@tanstack/react-query";
import { getNewsByCategory, getNews, getNewById, searchNews } from "@/features/news/api/news.services";
import type { INews } from "@/features/news/types/News.type.ts";

export const useGetNews = () => {
  return useQuery<INews[]>({
    queryKey: ['news'],
    queryFn: getNews,
  })
};

export const useGetNewsPorCategories = (categoryId?: string) => {
  return useQuery<INews[]>({
    queryKey: ['news', categoryId],
    queryFn: () => getNewsByCategory(categoryId!),
    enabled: !!categoryId
  });
};

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
