import axiosPrivateClient from "@/lib/axios.private.client";
import { videoLessonService } from "@/services/video-lesson";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
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


// Video Sub Categories list hook
export const useGetVideoSubCategoryList = (id) => {
  const axiosInstance = axiosPrivateClient();

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["video-sub-category-list", id],
    queryFn: () => videoLessonService.getVideoSubCategoryList(axiosInstance, id),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    videoSubCategoryListData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};



// Reusable hook for fetching paginated category or subcategory videos
export const useGetCategoryOrSubcategoryVideos = ({ id, isSubcategory = false, enabled = true } = {}) => {
  const axiosInstance = axiosPrivateClient();

  const queryKey = [
    isSubcategory ? "video-sub-category-single-videos" : "browse-single-categories-videos",
    id,
  ];

  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      const params = { page: pageParam };
      return isSubcategory
        ? videoLessonService.getSingleSubCategory(axiosInstance, id, params)
        : videoLessonService.getSingleBrowseCategoriesVideos(axiosInstance, id, params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const payload = lastPage?.data || lastPage;
      if (!payload) return undefined;

      if (payload?.has_next) {
        if (payload?.next_page) return Number(payload.next_page);
        if (payload?.current_page && payload?.total_pages && Number(payload.current_page) < Number(payload.total_pages)) {
          return Number(payload.current_page) + 1;
        }
      }

      const currentPage = Number(payload.current_page);
      const totalPages = Number(payload.total_pages);
      if (currentPage && totalPages) {
        return currentPage < totalPages ? currentPage + 1 : undefined;
      }

      if (payload.next) {
        try {
          const url = new URL(payload.next, "http://localhost");
          const page = url.searchParams.get("page");
          if (page) return Number(page);
        } catch {
          // Fallback if URL parsing fails
        }
        return (currentPage || 1) + 1;
      }

      return undefined;
    },
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: Boolean(id && enabled),
  });

  const firstPagePayload = data?.pages?.[0]?.data || data?.pages?.[0];

  return {
    data,
    firstPageData: firstPagePayload,
    singleSubCategoryVideosData: firstPagePayload,
    singleBrowseCategoriesVideosData: firstPagePayload,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};

// video sub category single with pagination
export const singleSubCategoryVideosData = (id) => {
  return useGetCategoryOrSubcategoryVideos({ id, isSubcategory: true });
};

// browse category single videos with pagination
export const useGetSingleBrowseCategoriesVideos = (id) => {
  return useGetCategoryOrSubcategoryVideos({ id, isSubcategory: false });
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
      queryClient.invalidateQueries({ queryKey: ["browse-video-categories"] });
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
