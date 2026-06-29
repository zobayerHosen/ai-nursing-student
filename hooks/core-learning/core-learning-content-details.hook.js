import axiosPrivateClient from "@/lib/axios.private.client";
import { GetCoreLearningContentDetailsService } from "@/services/core-learning";
import { useQuery } from "@tanstack/react-query";

export const useGetCoreLearningContentDetails = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["core-learning-content-details", id],
    queryFn: () => GetCoreLearningContentDetailsService(id, axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    topicDetailsData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
