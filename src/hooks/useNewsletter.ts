import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribeNewsletter, updatePreferences, unsubscribeNewsletter, getMySubscription } from "@/services/newsletter.services";
import type { SubscribeRequest, UpdatePreferencesRequest } from "@/types/Newsletter.type";

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
