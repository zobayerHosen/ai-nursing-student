import axiosPrivateClient from "@/lib/axios.private.client";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentHistory = () => {
  const axiosInstance = axiosPrivateClient();

  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/payment-history/`);
      return response?.data?.data?.invoices;
    },
  });

  return {
    paymentHistory,
    isLoading
  }
};
