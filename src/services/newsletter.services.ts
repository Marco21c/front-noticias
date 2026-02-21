import { apiClient } from '../lib/axios';
import type { INewsletter, SubscribeRequest, UpdatePreferencesRequest } from '@/types/Newsletter.type';

export const subscribeNewsletter = async (data: SubscribeRequest): Promise<INewsletter> => {
  const response = await apiClient.post('/newsletter/subscribe', data);
  return response.data.data;
};

export const updatePreferences = async (data: UpdatePreferencesRequest): Promise<INewsletter> => {
  const response = await apiClient.put('/newsletter/preferences', data);
  return response.data.data;
};

export const unsubscribeNewsletter = async (): Promise<INewsletter> => {
  const response = await apiClient.delete('/newsletter/unsubscribe');
  return response.data.data;
};

export const getMySubscription = async (): Promise<INewsletter | null> => {
  const response = await apiClient.get('/newsletter/my-subscription');
  return response.data.data;
};
