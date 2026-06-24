import axiosPrivateClient from "@/lib/axios.private.client";
import { SaveNoteService } from "@/services/core-learning";
import { useMutation } from "@tanstack/react-query";

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
      SaveNoteService(payload, axiosInstance),
  });

  return {
    saveNote,
    isPending,
    data,
    isError,
    error,
  };
};
