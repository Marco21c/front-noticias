import { apiClient } from '../lib/axios';
import type { ICategory } from '@/types/Category.type';

export const getCategories = async (): Promise<ICategory[]> => {
    const { data } = await apiClient.get('/categories');
    return data.data;
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data.data;
};
