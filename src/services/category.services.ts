import axios from 'axios';

import { apiClient } from '../lib/axios';
import { data } from 'react-router-dom';

export const getCategories = async () => {
  const { data } = await apiClient.get('/categories');
  return data.categories;
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