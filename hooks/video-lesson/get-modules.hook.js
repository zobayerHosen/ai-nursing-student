import axiosPrivateClient from "@/lib/axios.private.client";
import { GetModulesService } from "@/services/video-lesson";
import { useQuery } from "@tanstack/react-query";

export const useGetModules = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-modules"],
    queryFn: () => GetModulesService(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    modulesData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
