import axiosPrivateClient from "@/lib/axios.private.client";
import { StepProfileSetupService } from "@/services";
import setToken from "@/utils/setToken";
import { useMutation } from "@tanstack/react-query";

export const useStepProfileSetup = () => {
  const axiosInstance = axiosPrivateClient();
  const {
    mutateAsync: stepProfileSetup,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => StepProfileSetupService(payload, axiosInstance),
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