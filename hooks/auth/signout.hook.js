import { LogoutAction } from "@/actions/auth/logout.action";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLogout = () => {
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
      toast.success("Logged out successfully!");
    },
    onError: (error) => {
      // $&
      toast.error("Something went wrong! Please try again.");
    },
  });
  return {
    logout,
    isPending,
    data,
  };
};
