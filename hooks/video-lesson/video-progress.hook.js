import axiosPrivateClient from "@/lib/axios.private.client";
import { VideoProgressService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const usePostVideoProgress = () => {
  const axiosInstance = axiosPrivateClient();

  const {
    mutateAsync: videoProgress,
    isPending,
  } = useMutation({
    mutationKey: ["video-progress-post"],
    mutationFn: async ({ id, ...payload }) =>
      VideoProgressService(id, payload, axiosInstance),
  });

  return {
    videoProgress,
    isPending,
  };
};
