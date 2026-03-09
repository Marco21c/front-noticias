import { apiClient } from '@/shared/lib/axios';
import type { INewsletter, SubscribeRequest, UpdatePreferencesRequest } from '@/features/newsletter/types/Newsletter.type.ts';

/**
 * Inscribe al usuario logueado al newsletter enviando sus preferencias.
 * @param {SubscribeRequest} data Objeto con IDs de categorías preferidas
 * @returns {Promise<INewsletter>} Modelo de suscripción
 */
export const subscribeNewsletter = async (data: SubscribeRequest): Promise<INewsletter> => {
  const response = await apiClient.post('/newsletter/subscribe', data);
  return response.data.data;
};

/**
 * Modifica las preferencias de la suscripción existente del usuario logueado.
 * @param {UpdatePreferencesRequest} data Nuevo arreglo de categorías
 * @returns {Promise<INewsletter>} Suscripción modificada
 */
export const updatePreferences = async (data: UpdatePreferencesRequest): Promise<INewsletter> => {
  const response = await apiClient.put('/newsletter/preferences', data);
  return response.data.data;
};

/**
 * Elimina la suscripción del usuario logueado al sistema de newsletters.
 * @returns {Promise<INewsletter>}
 */
export const unsubscribeNewsletter = async (): Promise<INewsletter> => {
  const response = await apiClient.delete('/newsletter/unsubscribe');
  return response.data.data;
};

/**
 * Solicita el estado actual y detalles de la suscripción del usuario en sesión.
 * @returns {Promise<INewsletter | null>} Objeto con las preferencias, o null si no existe.
 */
export const getMySubscription = async (): Promise<INewsletter | null> => {
  const response = await apiClient.get('/newsletter/my-subscription');
  return response.data.data;
};
