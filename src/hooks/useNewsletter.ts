import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribeNewsletter, updatePreferences, unsubscribeNewsletter, getMySubscription } from "@/services/newsletter.services";
import type { SubscribeRequest, UpdatePreferencesRequest } from "@/types/Newsletter.type";

/**
 * Hook para gestionar la suscripcion al newsletter.
 * Proporciona metodos para suscribirse, actualizar preferencias y desuscribirse.
 * 
 * @returns {Object} Objeto con:
 *   - subscription: Datos de la suscripcion actual
 *   - isLoading: Estado de carga
 *   - error: Error si ocurrio
 *   - subscribe: Funcion para suscribirse
 *   - updatePreferences: Funcion para actualizar preferencias
 *   - unsubscribe: Funcion para desuscribirse
 *   - isSubscribing: Estado de suscripcion en curso
 *   - isUpdating: Estado de actualizacion en curso
 *   - isUnsubscribing: Estado de desuscripcion en curso
 * 
 * @example
 * const { subscription, subscribe, isSubscribing } = useNewsletter();
 * subscribe({ preferredCategories: ['cat1', 'cat2'] });
 */
export const useNewsletter = () => {
  const queryClient = useQueryClient();

  const { data: subscription, isLoading, error } = useQuery({
    queryKey: ["newsletter", "subscription"],
    queryFn: getMySubscription,
    retry: false,
  });

  const subscribeMutation = useMutation({
    mutationFn: (data: SubscribeRequest) => subscribeNewsletter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter", "subscription"] });
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: UpdatePreferencesRequest) => updatePreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter", "subscription"] });
    },
  });

  const unsubscribeMutation = useMutation({
    mutationFn: () => unsubscribeNewsletter(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter", "subscription"] });
    },
  });

  return {
    subscription,
    isLoading,
    error,
    subscribe: subscribeMutation.mutate,
    updatePreferences: updatePreferencesMutation.mutate,
    unsubscribe: unsubscribeMutation.mutate,
    isSubscribing: subscribeMutation.isPending,
    isUpdating: updatePreferencesMutation.isPending,
    isUnsubscribing: unsubscribeMutation.isPending,
  };
};
