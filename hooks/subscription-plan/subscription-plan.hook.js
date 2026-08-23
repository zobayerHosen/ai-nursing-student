import axiosPublic from "@/lib/axios.public";
import axiosPrivateClient from "@/lib/axios.private.client";
import { subscriptionPlanService } from "@/services/subscription-plan";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useSubscriptionPlan = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: subscriptionPlan,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) =>
      subscriptionPlanService.subscribePlan(axiosInstance, payload),
  });

  return {
    subscriptionPlan,
    isPending,
    data,
  };
};

export const useGetSubscriptionPlanData = () => {
  const axiosInstance = axiosPublic();

  const {
    data: planDataGet,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-suscription-plan-data"],
    queryFn: async () => {
      const res = await subscriptionPlanService.getPlans(axiosInstance);
      return res?.data?.plans;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    planDataGet,
    isLoading,
    refetch,
    isFetching,
    isError,
  };
};

export const useGetMySubscription = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    data: mySubscriptionData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["my-subscription-data"],
    queryFn: async () => {
      const res = await subscriptionPlanService.getMySubscription(axiosInstance);
      return res?.data;
    },
  });

  return {
    mySubscriptionData,
    isLoading,
    isError,
    isFetching,
  };
};

export const useGetPaymentHistory = () => {
  const axiosInstance = axiosPrivateClient();

  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await subscriptionPlanService.getPaymentHistory(axiosInstance);
      return res?.data?.invoices;
    },
  });

  return {
    paymentHistory,
    isLoading,
  };
};

export const useSubscriptionPlanCancel = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: subscripitonPlanCancel,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) =>
      subscriptionPlanService.cancelSubscription(axiosInstance, payload),
  });

  return {
    subscripitonPlanCancel,
    isPending,
    data,
  };
};
