import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscriptionPlanData = () => {
  const axiosInstance = axiosPublic();

  const {
    data: planDataGet,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-suscription-plan-data"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/plans/`);
      return response?.data?.data?.plans;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    // enabled: !!token,
  });

  return {
    planDataGet,
    isLoading,
    refetch,
    isFetching,
    isError,
  };
};
