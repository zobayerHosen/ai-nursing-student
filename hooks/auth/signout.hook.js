import { LogoutAction } from "@/actions/auth/logout.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

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
      router.push("/")
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
