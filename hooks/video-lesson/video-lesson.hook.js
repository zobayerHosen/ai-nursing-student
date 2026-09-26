import axiosPrivateClient from "@/lib/axios.private.client";
import { videoLessonService } from "@/services/video-lesson";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

export const useAddVideoToFavorite = () => {
  const queryClient = useQueryClient();
  const axiosInstance = axiosPrivateClient();

  const { mutateAsync: addVideoToFavorite, isPending, variables } = useMutation({
    mutationKey: ["add-video-to-favorite"],
    mutationFn: async (id) => videoLessonService.addVideosTofavriate(axiosInstance, id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["browse-single-categories-videos"] });
      queryClient.invalidateQueries({ queryKey: ["video-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-video-lessons", "favorites"] });
      queryClient.invalidateQueries({ queryKey: ["video-details"] });
      toast.success(data?.data?.message || data?.message || "Favorite status updated");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update favorite");
    }
  });

  return {
    addVideoToFavorite,
    isPending,
    pendingId: variables,
  };
};

export const useGetVideoFavorites = (params = {}) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-favorites", params],
    queryFn: () => videoLessonService.getVideoFavorites(axiosInstance, params),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    videoFavoritesData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};

export const useGetVideoCategories = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["video-categories"],
    queryFn: () => videoLessonService.getVideoCategories(axiosInstance),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    videoCategoriesData: data?.data,
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
    progressData: data?.data || data,
    isLoading,
    isError,
    isFetching,
  };
};
