import { apiClient } from '../lib/axios';
import type { INewsletter, SubscribeRequest, UpdatePreferencesRequest } from '@/types/Newsletter.type';

/**
 * Suscribe al usuario autenticado al newsletter.
 * 
 * @param {SubscribeRequest} data - Datos de suscripcion con categorias preferidas
 * @returns {Promise<INewsletter>} Informacion de la suscripcion creada
 * @throws {Error} Error si el usuario ya esta suscrito o error del servidor
 */
export const subscribeNewsletter = async (data: SubscribeRequest): Promise<INewsletter> => {
  const response = await apiClient.post('/newsletter/subscribe', data);
  return response.data.data;
};

/**
 * Actualiza las preferencias de categorias del newsletter.
 * 
 * @param {UpdatePreferencesRequest} data - Nuevas categorias preferidas
 * @returns {Promise<INewsletter>} Informacion de la suscripcion actualizada
 * @throws {Error} Error si el usuario no esta suscrito
 */
export const updatePreferences = async (data: UpdatePreferencesRequest): Promise<INewsletter> => {
  const response = await apiClient.put('/newsletter/preferences', data);
  return response.data.data;
};

/**
 * Desuscribe al usuario del newsletter.
 * 
 * @returns {Promise<INewsletter>} Informacion de la suscripcion desactivada
 * @throws {Error} Error si el usuario no esta suscrito
 */
export const unsubscribeNewsletter = async (): Promise<INewsletter> => {
  const response = await apiClient.delete('/newsletter/unsubscribe');
  return response.data.data;
};

/**
 * Obtiene la suscripcion al newsletter del usuario autenticado.
 * 
 * @returns {Promise<INewsletter | null>} Informacion de la suscripcion o null si no esta suscrito
 * @throws {Error} Error de red o del servidor
 */
export const getMySubscription = async (): Promise<INewsletter | null> => {
  const response = await apiClient.get('/newsletter/my-subscription');
  return response.data.data;
};
