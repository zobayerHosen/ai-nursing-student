import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user";
import { getClientToken } from "@/utils/getClientToken";
import axiosPrivateClient from "@/lib/axios.private.client";

export const useGetUser = () => {
  const token = getClientToken();
  const axiosInstance = axiosPrivateClient();
  const { data, isLoading, error, refetch, isError, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getUser(axiosInstance),
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!token,
  });
  return {
    user: data?.data?.data,
    isLoading,
    error,
    refetch,
    isError,
    isFetching,
  };
};

export const useChangePassword = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: changePassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => userService.changePassword(axiosInstance, payload),
  });

  return {
    changePassword,
    isPending,
    data,
  };
};

export const useUpdatePassword = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: updatePassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => userService.updatePassword(axiosInstance, payload),
  });

  return {
    updatePassword,
    isPending,
    data,
  };
};

export const useUpdateInfo = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: updateInfo,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => userService.updateInfo(axiosInstance, payload),
  });

  return {
    updateInfo,
    isPending,
    data,
  };
};

export const useUpdateAvatar = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: updateAvatar,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["user-profile-avatar"],
    mutationFn: (payload) => userService.updateAvatar(axiosInstance, payload),
  });

  return {
    updateAvatar,
    isPending,
    data,
  };
};

export const useDeleteUserImage = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: deleteUserImage,
    isPending,
    data,
  } = useMutation({
    mutationFn: () => userService.deleteUserImage(axiosInstance),
  });

  return {
    deleteUserImage,
    isPending,
    data,
  };
};

export const useDeleteUser = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: deleteUser,
    isPending,
    data,
  } = useMutation({
    mutationFn: () => userService.deleteUser(axiosInstance),
  });

  return {
    deleteUser,
    isPending,
    data,
  };
};

export const useGetNotificationSettings = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["notification-settings"],
    queryFn: () => userService.getNotificationSettings(axiosInstance),
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

export const useUpdateNotificationSettings = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateNotificationSettings,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => userService.updateNotificationSettings(axiosInstance, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification-settings"] });
    },
  });

  return {
    updateNotificationSettings,
    isPending,
    data,
  };
};

export const useUserGetNotifications = () => {
  const axiosInstance = axiosPrivateClient();

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => userService.getUserNotifications(axiosInstance),
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

export const useReadAllNotification = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutate: readAllNotification,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) =>
      userService.readAllNotification(axiosInstance, payload),
  });

  return {
    readAllNotification,
    isPending,
    data,
  };
};
