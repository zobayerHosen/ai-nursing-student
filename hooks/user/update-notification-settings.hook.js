import axiosPrivateClient from "@/lib/axios.private.client";
import { UpdateNotificationSettingsService } from "@/services/user/update-notification-settings.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNotificationSettings = () => {
  const axiosInstance = axiosPrivateClient();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateNotificationSettings,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => UpdateNotificationSettingsService(payload, axiosInstance),
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
