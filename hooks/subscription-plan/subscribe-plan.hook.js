import axiosPrivateClient from "@/lib/axios.private.client";
import { SubscriptionPlanServices } from "@/services/subscription-plan";
import { useMutation } from "@tanstack/react-query";

export const useSubscriptionPlan = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: subscriptionPlan,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) =>
      SubscriptionPlanServices(payload, axiosInstance),
  });

  return {
    subscriptionPlan,
    isPending,
    data,
  };
};