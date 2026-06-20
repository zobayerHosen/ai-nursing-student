"use client";

import axiosPrivateClient from "@/lib/axios.private.client";
import { DeleteLibraryService } from "@/services/library";
import { useMutation } from "@tanstack/react-query";

export const useDeleteLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: deleteLibrary,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: (id) => DeleteLibraryService(id, axiosInstance),
  });

  return {
    deleteLibrary,
    isPending,
    data,
    isError,
    error,
  };
};
