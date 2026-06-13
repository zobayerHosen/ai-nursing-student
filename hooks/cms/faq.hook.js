import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";
import { GetFaqService } from "@/services/cms";

export const useGetFaq = () => {
  const axiosInstance = axiosPublic();

  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-faq"],
    queryFn: async () => {
      return await GetFaqService(axiosInstance);
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    faqData: data?.data?.data,
    isLoading,
    refetch,
    isFetching,
    isError,
  };
};
