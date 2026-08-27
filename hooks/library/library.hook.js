import axiosPublic from "@/lib/axios.public";
import axiosPrivateClient from "@/lib/axios.private.client";
import { libraryService } from "@/services/library";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["library-get"],
    queryFn: () => libraryService.getLibrary(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    libraryData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};

export const useCreateLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: createLibrary,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: (payload) => libraryService.createLibrary(axiosInstance, payload),
  });

  return {
    createLibrary,
    isPending,
    data,
    isError,
    error,
  };
};

export const useRenameLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: renameLibrary,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => libraryService.renameLibrary(axiosInstance, id, payload),
  });

  return {
    renameLibrary,
    isPending,
    data,
    isError,
    error,
  };
};

export const useDeleteLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: deleteLibrary,
    isPending,
    data,
    isError,
    error,
  } = useMutation({
    mutationFn: (id) => libraryService.deleteLibrary(axiosInstance, id),
  });

  return {
    deleteLibrary,
    isPending,
    data,
    isError,
    error,
  };
};

export const useGetFolderIcon = () => {
  const axiosInstance = axiosPublic();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["folder-icon-get"],
    queryFn: () => libraryService.getFolderIcon(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    folderIconData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};

export const useGetFolderColor = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["folder-color-get"],
    queryFn: () => libraryService.getFolderColor(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    folderColorData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
