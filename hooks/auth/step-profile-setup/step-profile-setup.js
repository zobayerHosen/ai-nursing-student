// import axiosPrivateClient from "@/lib/axios.private.client";
import axiosPublic from "@/lib/axios.public";
import { StepProfileSetupService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useStepProfileSetup = () => {
  const axiosInstance = axiosPublic();
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