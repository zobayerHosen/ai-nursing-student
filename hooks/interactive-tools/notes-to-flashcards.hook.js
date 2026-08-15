import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivateClient from "@/lib/axios.private.client";
import {
  allGeneratedFlashCard,
  deleteAllHistoryList,
  deleteSingleHistoryList,
  generateFlashCard,
  getFlashCardById,
  getFlashCardHistoryList,
  markAsKnowItOrStillLearning,
  sessionScore,
} from "@/services/interactive-tool";
import toast from "react-hot-toast";


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

export const useGetFlashCardsHistoryList = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-flashcards"],
    queryFn: () => getFlashCardHistoryList(axiosInstance),
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

export const useGetSessionScore = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-flashcard-session", id],
    queryFn: () => sessionScore(axiosInstance, id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    sessionScore: data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};


// Note: after generating note to flashcard get all generated flashcard for a session
export const useGetAllGeneratedFlashCards = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-flashcard-session", id],
    queryFn: () => allGeneratedFlashCard(axiosInstance, id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    sessionData: data?.data ?? null,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};


export const useMarkAsKnowItOrStillLearning = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: cardLearnedOrNot,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-flashcards-mark-as-know-it-or-still-learning"],
    mutationFn: ({ id, payload }) => markAsKnowItOrStillLearning(axiosInstance, id, payload),
    onSuccess: (data, variables) => {
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["notes-to-flashcard-session", variables.id] });
      }
      queryClient.invalidateQueries({ queryKey: ["notes-to-flashcards"] });
    },
  });

  return {
    cardLearnedOrNot,
    isPending,
    isError,
    error,
  };
};



export const useDeleteSingleHistoryList = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteSingleHistory,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-flashcards-delete-single-history"],
    mutationFn: (id) => deleteSingleHistoryList(axiosInstance, id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-flashcards"] });
      toast.success(data?.message ?? "Successfully deleted")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete")
    },
  });

  return {
    deleteSingleHistory,
    isPending,
    isError,
    error,
  };
};


//  delete all history list api
export const useDeleteAllHistoryList = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteAllHistory,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-flashcards-delete-all-history"],
    mutationFn: () => deleteAllHistoryList(axiosInstance),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-flashcards"] });
      toast.success(data?.message ?? "Successfully deleted all history")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete all history")
    },
  });

  return {
    deleteAllHistory,
    isPending,
    isError,
    error,
  };
};