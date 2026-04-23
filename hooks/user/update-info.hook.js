"use client";

import axiosPrivateClient from "@/lib/axios.private.client";
import { UpdateInfoService } from "@/services/user/update-info.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateInfo = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: updateInfo,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => UpdateInfoService(payload, axiosInstance),
  });

  return {
    updateInfo,
    isPending,
    data,
  };
};
