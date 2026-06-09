import axiosPrivateClient from "@/lib/axios.private.client";
import { ChangePasswordService } from "@/services/user/change-password.service";
import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: changePassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => ChangePasswordService(payload, axiosInstance),
  });

  return {
    changePassword,
    isPending,
    data,
  };
};
