import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios.public";
import { SigninService } from "@/services/auth/signin.service";

export const useSignin = () => {
  const axiosInstance = axiosPublic();
  const {
    mutateAsync: signin,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => SigninService(payload, axiosInstance),
  });

  return {
    signin,
    isPending,
    data,
  };
};
