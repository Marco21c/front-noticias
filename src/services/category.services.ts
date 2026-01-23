import axios from 'axios';
import { apiClient } from '../lib/axios';

export const getCategories = async () => {
    try{
    const { data } = await axios.get(`${apiClient}/categories`);
    return data;
    } catch(error){
        console.error("Error get news: ", Error);
        throw error;
    }
};

export const getCategoryById = async (id: string) => {
    const { data } = await axios.get(`${apiClient}/categories/${id}`);
    return data;
}

export const getCategoryByName = async (name: string) => {
    const { data } = await axios.get(`${apiClient}/categories/${name}`);
    return data;
}
// TODO: Add more category-related services as needed.