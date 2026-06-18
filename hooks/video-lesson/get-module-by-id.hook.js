import axiosPrivateClient from "@/lib/axios.private.client";
import { GetModuleByIdService } from "@/services/video-lesson";
import { useQuery } from "@tanstack/react-query";

export const useGetModuleById = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-module", id],
    queryFn: () => GetModuleByIdService(id, axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    moduleData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
