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

   
