import axiosPrivateClient from "@/lib/axios.private.client";
import { ReadAllNotificationServices } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useReadAllNotification = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutate: readAllNotification,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) =>
      ReadAllNotificationServices(payload, axiosInstance),
  });

  return {
    readAllNotification,
    isPending,
    data,
  };
};