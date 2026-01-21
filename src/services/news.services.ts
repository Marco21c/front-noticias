import type { INews } from '@/interfaces/News.type';
import { apiClient } from '../lib/axios';
//import { newsMock } from '../mocks/newsMocks';

export const getNews = async (): Promise<INews[]> => {
    try {
        const { data } = await apiClient.get('/api/news');
        console.log('News:', data);
        return data;
      //el mappeo no lo use 
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
// Hacer lo mismo que el getNews 👆 para todas las funciones de abajo

/* export const getNewsByCategory = async (category: string): Promise<News[]> => {
    try {
        const { data } = await apiClient.get(`/news?category=${category}`);
        return mapNewsArray(data.data || data);
    } catch (error) {
        console.error('Error fetching news by category:', error);
        throw error;
    }
};

export const getNewsById = async (id: string): Promise<News> => {
    try {
        const { data } = await apiClient.get(`/news/${id}`);
        const mapped = mapNewsArray(Array.isArray(data) ? data : [data]);
        return mapped[0];
    } catch (error) {
        console.error('Error fetching news by id:', error);
        throw error;
    }
};

export const searchNews = async (query: string): Promise<News[]> => {
    try {
        const { data } = await apiClient.get('/news/search', {
            params: { q: query },
        });
        return mapNewsArray(data.data || data);
    } catch (error) {
        console.error('Error searching news:', error);
        throw error;
    }
}; */

// TODO: Add more services as needed.
