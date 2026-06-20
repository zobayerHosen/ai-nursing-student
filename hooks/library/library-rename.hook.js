"use client";

import axiosPrivateClient from "@/lib/axios.private.client";
import { RenameLibraryService } from "@/services/library";
import { useMutation } from "@tanstack/react-query";

export const useRenameLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: renameLibrary,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => RenameLibraryService(id, payload, axiosInstance),
  });

  return {
    renameLibrary,
    isPending,
    data,
    isError,
    error,
  };
};
