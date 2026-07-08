import axiosPrivateClient from "@/lib/axios.private.client";
import { GetVideoLessonsProgressService } from "@/services/video-lesson";
import { useQuery } from "@tanstack/react-query";

export const useGetVideoLessonsProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-lessons-progress"],
    queryFn: () => GetVideoLessonsProgressService(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    progressData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};