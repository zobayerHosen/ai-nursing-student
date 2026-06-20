import axiosPrivateClient from "@/lib/axios.private.client";
import { GetLibraryService } from "@/services/library";
import { useQuery } from "@tanstack/react-query";

export const useGetLibrary = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["library-get"],
    queryFn: () => GetLibraryService(axiosInstance),
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
