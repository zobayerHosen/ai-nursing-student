import axiosPrivateClient from "@/lib/axios.private.client";
import { CoreLearningService } from "@/services/core-learning";
import { useQuery } from "@tanstack/react-query";

export const useCoreLearning = (pathName) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["core-learning", pathName],
    queryFn: () => CoreLearningService(pathName, axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!pathName,
  });

  return {
    coreLearningData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};