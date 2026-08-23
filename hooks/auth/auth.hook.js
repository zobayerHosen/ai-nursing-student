import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axiosPublic from "@/lib/axios.public";
import axiosPrivateClient from "@/lib/axios.private.client";
import { authService } from "@/services";
import { LogoutAction } from "@/actions/auth/logout.action";
import setToken from "@/utils/setToken";

export const useSignin = () => {
  const axiosInstance = axiosPublic();
  const {
    mutateAsync: signin,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => authService.signin(axiosInstance, payload),
  });

  return {
    signin,
    isPending,
    data,
  };
};

export const useSignup = () => {
  const axiosInstance = axiosPublic();

  const {
    mutateAsync: signup,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => authService.signup(axiosInstance, payload),
  });

  return {
    signup,
    isPending,
    data,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutateAsync: logout,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await LogoutAction();
    },
    onSuccess: () => {
      queryClient.removeQueries();
      queryClient.clear();
      Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || "stemrn_auth");
      toast.success("Logged out successfully!");
      router.push("/");
    },
    onError: (error) => {
      toast.error("Something went wrong! Please try again.");
    },
  });
  return {
    logout,
    isPending,
    data,
  };
};

export const useForgotPassword = () => {
  const axiosInstance = axiosPublic();
  const {
    mutateAsync: forgotPassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => authService.forgotPassword(axiosInstance, payload),
  });

  return {
    forgotPassword,
    isPending,
    data,
  };
};

export const useSocialLogin = () => {
  const axiosInstance = axiosPublic();

  const {
    mutateAsync: sociallogin,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => authService.socialLogin(axiosInstance, payload),
  });

  return {
    sociallogin,
    isPending,
    data,
  };
};

export const useResetPassword = () => {
  const axiosInstance = axiosPublic();
  const {
    mutateAsync: resetPassword,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => authService.resetPassword(axiosInstance, payload),
  });

  return {
    resetPassword,
    isPending,
    data,
  };
};

export const useStepProfileSetup = () => {
  const axiosInstance = axiosPrivateClient();
  const {
    mutateAsync: stepProfileSetup,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => authService.stepProfileSetup(axiosInstance, payload),
    onSuccess: (data) => {
      const responseData = data?.data || data;
      if (responseData?.tokens?.access) {
        setToken(responseData?.tokens?.access, responseData?.expires_in);
      }
    }
  });

  return {
    stepProfileSetup,
    isPending,
    data,
  };
};
