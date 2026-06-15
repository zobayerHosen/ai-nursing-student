import axiosPrivateClient from "@/lib/axios.private.client";
import { SubmitFlashcardAnswerService } from "@/services/flashcards";
import { useMutation } from "@tanstack/react-query";

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
      SubmitFlashcardAnswerService(payload, axiosInstance),
  });

  return {
    submitAnswer,
    isPending,
    data,
    isError,
    error,
  };
};
