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

  const flashcardData = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data)
    ? data
    : [];

  return {
    flashcardData,
    isLoading,
    isError,
    isFetching,
  };
};

export const useGetDeckDetails = (deckId) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["deck-details", deckId],
    queryFn: () => flashcardsService.getDeckDetails(axiosInstance, deckId),
    enabled: !!deckId,
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  const deckData = data?.data ?? data ?? null;

  return {
    deckData,
    isLoading,
    isError,
    isFetching,
    refetch,
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

  const progressData = data?.data?.data ?? data?.data ?? data ?? {};
  const categories = progressData?.categories ?? [];
  const overall = progressData?.overall ?? null;

  return {
    categories,
    overall,
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
