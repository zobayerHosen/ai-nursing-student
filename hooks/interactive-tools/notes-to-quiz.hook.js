import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axiosPrivateClient from "@/lib/axios.private.client";
import {
  deleteAllQuizzes,
  deleteSingleQuiz,
  generateQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizScore,
  restartQuiz,
  submitQuestionAnswer,
} from "@/services/interactive-tool";

// 2. list quiz history hook
export const useGetAllQuizzes = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-quizzes"],
    queryFn: () => getAllQuizzes(axiosInstance),
    staleTime: 0,
    retry: false,
  });

  const quizzes = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.quizzes)
    ? data.quizzes
    : [];

  return {
    quizzes,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

// 3. get single quiz hook
export const useGetQuizById = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-quiz", id],
    queryFn: () => getQuizById(axiosInstance, id),
    enabled: Boolean(id) && id !== "null" && id !== "undefined",
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    quiz: data?.data ?? data,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

// 1. generate quiz hook
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
    onSuccess: (resData) => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-quizzes"] });
      toast.success(resData?.message ?? "Quiz generated successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message ?? "Failed to generate quiz");
    },
  });

  return {
    generateNclexQuiz,
    isPending,
    generatedQuiz: data?.data ?? data,
    data,
    isError,
    error,
  };
};

// 4. submit answer hook
export const useSubmitQuestionAnswer = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: submitAnswer,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-quiz-submit"],
    mutationFn: ({ id, payload }) =>
      submitQuestionAnswer(axiosInstance, id, payload),
    onSuccess: (_, variables) => {
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ["notes-to-quiz", variables.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["notes-to-quiz-score", variables.id],
        });
      }
    },
  });

  return {
    submitAnswer,
    isPending,
    isError,
    error,
  };
};

// 5. get score hook
export const useGetQuizScore = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching, error, refetch } = useQuery({
    queryKey: ["notes-to-quiz-score", id],
    queryFn: () => getQuizScore(axiosInstance, id),
    enabled: Boolean(id) && id !== "null" && id !== "undefined",
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    scoreData: data?.data ?? data,
    data,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  };
};

// 6. restart exam hook
export const useRestartQuiz = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: restartNclexQuiz,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-quiz-restart"],
    mutationFn: (id) => restartQuiz(axiosInstance, id),
    onSuccess: (resData, id) => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-quiz", id] });
      queryClient.invalidateQueries({ queryKey: ["notes-to-quiz-score", id] });
      toast.success(resData?.message ?? "Quiz progress reset successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message ?? "Failed to restart quiz");
    },
  });

  return {
    restartNclexQuiz,
    isPending,
    isError,
    error,
  };
};

// 7. delete single quiz hook
export const useDeleteSingleQuiz = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteSingleQuizItem,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-quiz-delete-single"],
    mutationFn: (id) => deleteSingleQuiz(axiosInstance, id),
    onSuccess: (resData) => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-quizzes"] });
      toast.success(resData?.message ?? "Quiz deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message ?? "Failed to delete quiz");
    },
  });

  return {
    deleteSingleQuizItem,
    isPending,
    isError,
    error,
  };
};

// 8. delete all quizzes hook
export const useDeleteAllQuizzes = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteAllQuizItems,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["notes-to-quiz-delete-all"],
    mutationFn: () => deleteAllQuizzes(axiosInstance),
    onSuccess: (resData) => {
      queryClient.invalidateQueries({ queryKey: ["notes-to-quizzes"] });
      toast.success(resData?.message ?? "All quizzes deleted successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message ?? "Failed to delete all quizzes");
    },
  });

  return {
    deleteAllQuizItems,
    isPending,
    isError,
    error,
  };
};
