import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivateClient from "@/lib/axios.private.client";
import {
  generateFlashCard,
  getFlashCardById,
  getFlashCards,
} from "@/services/interactive-tool";

export const useGetFlashCards = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-flashcards"],
    queryFn: () => getFlashCards(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    flashcardsList: data?.data?.data ?? [],
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

export const useGetFlashCardById = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-flashcard", id],
    queryFn: () => getFlashCardById(axiosInstance, id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    flashcard: data?.data,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

export const useGenerateFlashCard = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: generateFlashcards,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-flashcards-generate"],
    mutationFn: (payload) => generateFlashCard(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-flashcards"] });
    },
  });

  return {
    generateFlashcards,
    isPending,
    generatedFlashcards: data?.data,
    data,
    isError,
    error,
  };
};
