import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user/getuser.service";
import { getClientToken } from "@/utils/getClientToken";
import axiosPrivateClient from "@/lib/axios.private.client";

export const useGetUser = () => {
  const token = getClientToken();
  const axiosInstance = axiosPrivateClient();
  const { data, isLoading, error, refetch, isError, isFetching } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getUser(axiosInstance),
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!token,
  });
  return {
    user: data?.data,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  };
};
