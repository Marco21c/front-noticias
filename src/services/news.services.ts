import type { INews, INewsCreate } from '@/interfaces/News.type';
import { apiClient } from '../lib/axios';

 export const getNews = async (): Promise<INews[]> => {
     try {
         const { data } = await apiClient.get('/news');
         console.log('News:', data);
         return data;
         //el mappeo no lo use 
     } catch (error) {
         console.error('Error fetching news:', error);
         throw error;
     }
 };

 export const postNew = async (newData:INewsCreate) => {
     try{
        newData.slug = newData.title  .toLowerCase()
          .normalize("NFD") 
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9 ]/g, "")
          .trim()
          .replace(/\s+/g, "-");
        newData.variant = "highlighted";
        const {data} = await apiClient.post("/news", newData);  
        return data;
     }
     catch(error){
          console.error("Error creating news:", error);
          throw error;
     }
 }  

 export const getNewsByCategory = async (category: string): Promise<INews[]> => {
    try {
        const { data } = await apiClient.get('/news/category', {
             params: { category }
         });
        return data;
    } catch (error) {
        console.error('Error fetching news by category:', error);
        throw error;
    }
};

export const getNewById = async (id: string): Promise<INews> => {
 try{
  const { data } = await apiClient.get(`/news/${id}`);
  return data;
 }
 catch(error){
    console.error('Error fetching new by id:', error);
        throw error;
 }
};

export const updateNew = async ({ id, payload}: {id: string; payload: INewsCreate}): Promise<INews> => { 
 try{
  const { data } = await apiClient.put(`/news/${id}`, payload);
  return data;
}catch(error){
    console.error('Error update new:', error);
        throw error;
 }
};

export const deleteNew = async (id: string): Promise<void> => {
  await apiClient.delete(`/news/${id}`);
};

   
