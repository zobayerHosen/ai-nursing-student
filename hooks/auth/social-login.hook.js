import { useMutation } from "@tanstack/react-query";
import axiosPublic from "@/lib/axios.public";
import { SocialLoginService } from "@/services/auth/social-login.service";

export const useSocialLogin = () => {
  const axiosInstance = axiosPublic();

  const {
    mutateAsync: sociallogin,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => SocialLoginService(payload, axiosInstance),
  });

  return {
    sociallogin,
    isPending,
    data,
  };
};
