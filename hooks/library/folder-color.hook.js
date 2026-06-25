import axiosPrivateClient from "@/lib/axios.private.client";
import { GetFolderColorService } from "@/services/library";
import { useQuery } from "@tanstack/react-query";

export const useGetFolderColor = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["folder-color-get"],
    queryFn: () => GetFolderColorService(axiosInstance),
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
