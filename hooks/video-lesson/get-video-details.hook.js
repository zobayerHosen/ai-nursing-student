import axiosPrivateClient from "@/lib/axios.private.client";
import { GetVideoDetailsService } from "@/services/video-lesson";
import { useQuery } from "@tanstack/react-query";

export const useGetVideoDetails = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-details", id],
    queryFn: () => GetVideoDetailsService(id, axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    videoData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
