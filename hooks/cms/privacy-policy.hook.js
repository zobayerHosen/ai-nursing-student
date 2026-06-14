import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";
import { GetPrivacyPolicyService } from "@/services/cms";

export const useGetPrivacyPolicy = () => {
  const axiosInstance = axiosPublic();

  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-privacy-policy"],
    queryFn: async () => {
      return await GetPrivacyPolicyService(axiosInstance);
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    privacyPolicyData: data?.data,
    isLoading,
    refetch,
    isFetching,
    isError,
  };
};
