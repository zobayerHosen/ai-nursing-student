import axiosPrivateClient from "@/lib/axios.private.client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { helpAndSupportService, getHelpAndSupportListService } from "@/services/help-and-support";
import toast from "react-hot-toast";

export const useHelpAndSupport = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: createHelpAndSupport,
        isPending: isCreateHelpAndSupportPending
    } = useMutation({
        mutationKey: ["help-and-support"],

        mutationFn: async (payload) => {
            return await helpAndSupportService(axiosInstance, payload);
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Support request submitted successfully!");
            queryClient.invalidateQueries({ queryKey: ["help-and-support-list"] });
        },
        onError: (error) => {
            const errData = error?.response?.data;
            const msg = errData?.message || errData?.detail || (typeof errData === "string" ? errData : "Something went wrong");
            toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
        }
    });

    return {
        createHelpAndSupport,
        isCreateHelpAndSupportPending
    };
};

export const useGetHelpAndSupportList = () => {
    const axiosInstance = axiosPrivateClient();

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["help-and-support-list"],
        queryFn: async () => await getHelpAndSupportListService(axiosInstance),
        staleTime: 1 * 60 * 1000,
        retry: false,
    });

    const ticketsList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : Array.isArray(data)
        ? data
        : [];

    return {
        ticketsList,
        rawResponse: data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    };
};

export const useHelpAndSupportList = useGetHelpAndSupportList;