"use client";

import axiosPrivateClient from "@/lib/axios.private.client";
import { UpdateAvatarService } from "@/services/user/update-avatar.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAvatar = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: updateAvatar,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["user-profile-avatar"],
    mutationFn: (payload) => UpdateAvatarService(payload, axiosInstance),
  });

  return {
    updateAvatar,
    isPending,
    data,
  };
};
