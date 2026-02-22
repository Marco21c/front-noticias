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

    export const createCategory = async (category: Partial<ICategory>): Promise<ICategory> => {
        const { data } = await apiClient.post('/categories', category);
         console.log("CREATE CATEGORY RESPONSE", data);
        return data.data;
    }

    export const updateCategory = async (id: string, category: Partial<ICategory>): Promise<ICategory> => {
        const { data } = await apiClient.put(`/categories/${id}`, category);
        return data.data;
    }       

    export const deleteCategory = async (id: string): Promise<void> => {
        await apiClient.delete(`/categories/${id}`);
    }       