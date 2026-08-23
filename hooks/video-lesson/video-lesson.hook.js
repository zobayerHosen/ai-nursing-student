import axiosPrivateClient from "@/lib/axios.private.client";
import { videoLessonService } from "@/services/video-lesson";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetModules = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-modules"],
    queryFn: () => videoLessonService.getModules(axiosInstance),
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

export const useGetModuleById = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-module", id],
    queryFn: () => videoLessonService.getModuleById(axiosInstance, id),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    moduleData: data?.data,
    videoProgress: data?.data?.video_progress,
    isLoading,
    isError,
    isFetching,
  };
};

export const useGetVideoDetails = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-details", id],
    queryFn: () => videoLessonService.getVideoDetails(axiosInstance, id),
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

export const usePostVideoProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: videoProgress,
    isPending,
  } = useMutation({
    mutationKey: ["video-progress-post"],
    mutationFn: async ({ id, ...payload }) =>
      videoLessonService.updateVideoProgress(axiosInstance, id, payload),
  });

  return {
    videoProgress,
    isPending,
  };
};

export const useGetVideoLessonsProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-lessons-progress"],
    queryFn: () => videoLessonService.getVideoLessonsProgress(axiosInstance),
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
