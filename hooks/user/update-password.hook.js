import axiosPrivateClient from "@/lib/axios.private.client";
import { UpdatePasswordService } from "@/services/user/update-password.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: updatePassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => UpdatePasswordService(payload, axiosInstance),
  });

  return {
    updatePassword,
    isPending,
    data,
  };
};
