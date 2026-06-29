import axiosPrivateClient from "@/lib/axios.private.client";
import { GetProcedureLookupService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetProcedureLookup = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["procedure-lookup-get"],
    queryFn: () => GetProcedureLookupService(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    procedureData: data?.data?.data,
    isLoading,
    isError,
    isFetching,
  };
};
