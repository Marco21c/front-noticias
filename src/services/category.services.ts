import axios from 'axios';
import { URL_BACKEND } from '../lib/axios';

export const getCategories = async () => {
    const { data } = await axios.get(`${URL_BACKEND}/categories`);
    return data;
};

export const getCategoryById = async (id: string) => {
    const { data } = await axios.get(`${URL_BACKEND}/categories/${id}`);
    return data;
}

export const getCategoryByName = async (name: string) => {
    const { data } = await axios.get(`${URL_BACKEND}/categories/${name}`);
    return data;
}
// TODO: Add more category-related services as needed.