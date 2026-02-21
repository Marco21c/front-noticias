import type { INews, INewsCreate } from '@/types/News.type';
import { apiClient } from '../lib/axios';
interface SearchNewsResponse {
  data: INews[];
}
export const getNews = async (): Promise<INews[]> => {
    const { data } = await apiClient.get('/news');
    return data.data;
};

export const postNew = async (newData: INewsCreate): Promise<INews> => {
    const slug = newData.title.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    
    const payload = {
        ...newData,
        slug,
        variant: newData.variant || 'default',
    };
    
    const { data } = await apiClient.post("/news", payload);
    return data.data;
}

export const getNewsByCategory = async (category: string): Promise<INews[]> => {
    const { data } = await apiClient.get('/news/category', {
        params: { category }
    });
    return data.data;
};

export const getNewById = async (id: string): Promise<INews> => {
    const { data } = await apiClient.get(`/news/${id}`);
    return data.data;
};

export const updateNew = async ({ id, payload }: {
    id: string;
    payload: INewsCreate;
}): Promise<INews> => {
    const { data } = await apiClient.put(`/news/${id}`, payload);
    return data.data;
};


export const deleteNew = async (id: string): Promise<void> => {
    await apiClient.delete(`/news/${id}`);
};



export const searchNews = async (query: string): Promise<INews[]> => {
  const { data } = await apiClient.get<SearchNewsResponse>(
    "/news/search",
    { params: { q: query } }
  );

  return data.data;
};