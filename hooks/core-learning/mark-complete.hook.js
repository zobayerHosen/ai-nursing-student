import axiosPrivateClient from "@/lib/axios.private.client";
import { MarkCompleteService } from "@/services/core-learning";
import { useMutation } from "@tanstack/react-query";

export const useMarkComplete = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: markComplete,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["mark-complete"],
    mutationFn: async ({ id, ...payload }) =>
      MarkCompleteService(id, payload, axiosInstance),
  });

  return {
    markComplete,
    isPending,
    data,
    isError,
    error,
  };
};
