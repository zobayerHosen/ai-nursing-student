import { useQuery } from "@tanstack/react-query";
import axiosPrivateClient from "@/lib/axios.private.client";
import { GetNotificationSettingsService } from "@/services/user/notification-settings.service";

export const useGetNotificationSettings = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["notification-settings"],
    queryFn: () => GetNotificationSettingsService(axiosInstance),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    notificationSettings: data?.data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  };
};
