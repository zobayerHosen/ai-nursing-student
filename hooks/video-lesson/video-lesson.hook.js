import axiosPrivateClient from "@/lib/axios.private.client";
import { videoLessonService } from "@/services/video-lesson";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetExploreModules = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-modules"],
    queryFn: () => videoLessonService.getExploreModules(axiosInstance),
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


export const useGetBrowseVideoCategories = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["browse-video-categories"],
    queryFn: () => videoLessonService.getBrowseVideoCategories(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    browseVideoCategoriesData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};


export const useGetSingleBrowseCategoriesVideos = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["browse-single-categories-videos", id],
    queryFn: () => videoLessonService.getSingleBrowseCategoriesVideos(axiosInstance, id),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    singleBrowseCategoriesVideosData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
}


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
