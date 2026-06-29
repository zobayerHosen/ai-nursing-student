import axiosPublic from "@/lib/axios.public";
import { GetFolderIconService } from "@/services/library";
import { useQuery } from "@tanstack/react-query";

export const useGetFolderIcon = () => {
  const axiosInstance = axiosPublic();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["folder-icon-get"],
    queryFn: () => GetFolderIconService(axiosInstance),
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
