import axiosPrivateClient from "@/lib/axios.private.client";
import { CreateLibraryService } from "@/services/library";
import { useMutation } from "@tanstack/react-query";

export const useCreateLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: createLibrary,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload) => CreateLibraryService(payload, axiosInstance),
  });

  return {
    createLibrary,
    isPending,
    data,
    isError,
    error,
  };
};
