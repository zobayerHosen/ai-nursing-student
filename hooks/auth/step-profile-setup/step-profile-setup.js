import axiosPrivateClient from "@/lib/axios.private.client";
import { StepProfileSetupService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useStepProfileSetup = () => {
  const axiosInstance = axiosPrivateClient();
  const {
    mutateAsync: stepProfileSetup,
    isPending,
    data,
  } = useMutation({
    mutationFn: (payload) => StepProfileSetupService(payload, axiosInstance),
  });

  return {
    stepProfileSetup,
    isPending,
    data,
  };
};