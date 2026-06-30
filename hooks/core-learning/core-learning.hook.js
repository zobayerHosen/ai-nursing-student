import axiosPrivateClient from "@/lib/axios.private.client";
import { CoreLearningService } from "@/services/core-learning";
import { useQuery } from "@tanstack/react-query";

export const useCoreLearning = (pathName, params = {}) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["core-learning", pathName, params],
    queryFn: () => CoreLearningService(pathName, axiosInstance, params),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!pathName,
  });

  return {
    coreLearningData: data?.data?.data,
    coreLearningPagination: data?.data?.pagination,
    isLoading,
    isError,
    isFetching,
  };
};