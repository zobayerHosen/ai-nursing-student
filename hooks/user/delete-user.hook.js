"use client";

import axiosPrivateClient from "@/lib/axios.private.client";
import { DeleteUserService } from "@/services/user/delete-user.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: deleteUser,
    isPending,
    data,
  } = useMutation({
    mutationFn: () => DeleteUserService(axiosInstance),
  });

  return {
    deleteUser,
    isPending,
    data,
  };
};
