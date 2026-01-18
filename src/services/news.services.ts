import { apiClient } from '../lib/axios';
import { mapNewsArray } from '../services/mappers/news.mapper.ts';
import type { News } from '@/types/news.ts';

export const getNews = async (): Promise<News[]> => {
    try {
        const { data } = await apiClient.get('/news');
        console.log('Noticias recibidas:', data);
        return mapNewsArray(data.data || data);
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export const getNewsByCategory = async (category: string): Promise<News[]> => {
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
};

// TODO: Add more services as needed.
