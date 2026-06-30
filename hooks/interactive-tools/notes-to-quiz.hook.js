import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivateClient from "@/lib/axios.private.client";
import {
  generateQuiz,
  getAllQuizzes,
  getQuizById,
} from "@/services/interactive-tool";

export const useGetAllQuizzes = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-quizzes"],
    queryFn: () => getAllQuizzes(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    quizzes: data?.data?.data ?? [],
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

export const useGetQuizById = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-quiz", id],
    queryFn: () => getQuizById(axiosInstance, id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    quiz: data?.data,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

export const useGenerateQuiz = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: generateNclexQuiz,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-quiz-generate"],
    mutationFn: (payload) => generateQuiz(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-quizzes"] });
    },
  });

  return {
    generateNclexQuiz,
    isPending,
    generatedQuiz: data?.data,
    data,
    isError,
    error,
  };
};
