import axiosPrivateClient from "@/lib/axios.private.client";
import { GetLibraryTopicDetailsService } from "@/services/library";
import { useQuery } from "@tanstack/react-query";

export const useGetLibraryTopicDetails = (id) => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["library-topic-details", id],
    queryFn: () => GetLibraryTopicDetailsService(id, axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
    enabled: !!id,
  });

  return {
    topicDetailsData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
