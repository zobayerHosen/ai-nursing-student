import axiosPublic from "@/lib/axios.public";
import { SignupService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const axiosInstance = axiosPublic();

  const {
    mutateAsync: signup,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => SignupService(payload, axiosInstance),
  });

  return {
    signup,
    isPending,
    data,
  };
};
