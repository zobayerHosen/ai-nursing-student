import axiosPrivateClient from "@/lib/axios.private.client";
import { flashcardsService } from "@/services/flashcards";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetFlashcardCategory = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["flashcard-get"],
    queryFn: () => flashcardsService.getCategory(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    flashcardData: data?.data,
    isLoading,
    isError,
    isFetching,
  };
};

export const useGetFlashcardProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["flashcard-progress"],
    queryFn: () => flashcardsService.getProgress(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    categories: data?.data?.data?.categories ?? [],
    overall: data?.data?.data?.overall ?? null,
    isLoading,
    isError,
    isFetching,
  };
};

export const useSubmitFlashcardAnswer = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: submitAnswer,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload) =>
      flashcardsService.submitAnswer(axiosInstance, payload),
  });

  return {
    submitAnswer,
    isPending,
    data,
    isError,
    error,
  };
};
