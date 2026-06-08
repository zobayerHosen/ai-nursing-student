"use client";
import axiosPrivateClient from "@/lib/axios.private.client";
import { SubscriptionPlanCancelService } from "@/services/subscription-plan";
import { useMutation } from "@tanstack/react-query";

export const useSubscriptionPlanCancel = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: subscripitonPlanCancel,
    isPending,
    data,
  } = useMutation({
    mutationFn: async (payload) =>
      SubscriptionPlanCancelService(payload, axiosInstance),
  });

  return {
    subscripitonPlanCancel,
    isPending,
    data,
  };
};