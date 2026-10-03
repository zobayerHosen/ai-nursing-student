import axiosPrivateClient from "@/lib/axios.private.client";
import { coreLearningService } from "@/services/core-learning";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useCoreLearning = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["core-learning"],
    queryFn: () => coreLearningService.getCoreLearning(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,

  });

  return {
    coreLearningData: data?.data?.data?.categories,
    popularThisWeek: data?.data?.data?.popular_this_week,
    isLoading,
    isError,
    isFetching,
  };
};


// body systems
export const useBodySystem = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["body-systems"],
    queryFn: () => coreLearningService.getBodySystems(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,

  });

  return {
    bodySystemData: data?.data?.data,
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
    queryFn: () => coreLearningService.getStudyNotesSubCategories(axiosInstance, id),
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
    content_summary: data?.data,
    isLoading,
    isError,
    error,
  };
};