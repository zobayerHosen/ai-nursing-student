import { LogoutAction } from "@/actions/auth/logout.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
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
