import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios.public";
import { ForgotPasswordService } from "@/services/auth/forgot-password.service";


export const useForgotPassword = () => {
  const axiosInstance = axiosPublic();
  const {
    mutateAsync: forgotPassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => ForgotPasswordService(payload, axiosInstance),
  });

  return {
    forgotPassword,
    isPending,
    data,
  };
};
