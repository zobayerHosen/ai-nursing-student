import { useQuery } from "@tanstack/react-query";
import axiosPrivateClient from "@/lib/axios.private.client";
import { GetUserNotificationsService } from "@/services/user/get-user-notifications.service";

export const useUserGetNotifications = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => GetUserNotificationsService(axiosInstance),
    staleTime: 2 * 60 * 1000,
    retry: false,
  });

  return {
    notifications: data?.data?.notifications ?? [],
    unreadCount: data?.data?.unread_count ?? 0,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  };
};
