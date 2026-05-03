import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios.public";
import { ResetPasswordService } from "@/services/auth/reset-password.service";

export const useResetPassword = () => {
  const axiosInstance = axiosPublic();
  const {
    mutateAsync: resetPassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => ResetPasswordService(payload, axiosInstance),
  });

  return {
    resetPassword,
    isPending,
    data,
  };
};
