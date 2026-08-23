import axiosPrivateClient from "@/lib/axios.private.client";
import { coreLearningService } from "@/services/core-learning";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useCoreLearning = (pathName, params = {}) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["core-learning", pathName, params],
    queryFn: () => coreLearningService.getCoreLearning(axiosInstance, pathName, params),
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

export const useGetCoreLearningContentDetails = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["core-learning-content-details", id],
    queryFn: () => coreLearningService.getContentDetails(axiosInstance, id),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    topicDetailsData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};

export const useLearningCategoryDetails = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["learning-category-details", id],
    queryFn: () => coreLearningService.getCategoryDetails(axiosInstance, id),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    learningCategoryDetailsData: data?.data?.data || data?.data || data,
    isLoading,
    isError,
    isFetching,
    error,
  };
};

export const useMarkComplete = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: markComplete,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["mark-complete"],
    mutationFn: async ({ id, ...payload }) =>
      coreLearningService.markComplete(axiosInstance, id, payload),
  });

  return {
    markComplete,
    isPending,
    data,
    isError,
    error,
  };
};

export const useSaveNote = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: saveNote,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["save-note"],
    mutationFn: async ({ ...payload }) =>
      coreLearningService.saveNote(axiosInstance, payload),
  });

  return {
    saveNote,
    isPending,
    data,
    isError,
    error,
  };
};

export const useStudyNotesProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["study-notes-progress"],
    queryFn: () => coreLearningService.getStudyNotesProgress(axiosInstance),
  });

  return {
    content_summary: data?.content_summary,
    recentActivity: data?.recent_activity,
    topics: data?.topics,
    isLoading,
    isError,
    error,
  };
};