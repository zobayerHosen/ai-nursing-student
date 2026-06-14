import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";
import { GetTermsAndConditionsService } from "@/services/cms";

export const useGetTermsAndConditions = () => {
  const axiosInstance = axiosPublic();

  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-terms-and-conditions"],
    queryFn: async () => {
      return await GetTermsAndConditionsService(axiosInstance);
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    termsData: data?.data,
    isLoading,
    refetch,
    isFetching,
    isError,
  };
};
