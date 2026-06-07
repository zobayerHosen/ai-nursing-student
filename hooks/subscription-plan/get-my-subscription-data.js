"use client";
import axiosPrivateClient from "@/lib/axios.private.client";
import { useQuery } from "@tanstack/react-query";

export const useGetMySubscription = () => {
  const axiosInstance = axiosPrivateClient();

  // Note: query
  const {
    data: mySubscriptionData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["my-subscription-data"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/subscription/my/`);
      return response?.data?.data;
    },
  });

  return {
    mySubscriptionData,
    isLoading,
    isError,
    isFetching,
  };
};