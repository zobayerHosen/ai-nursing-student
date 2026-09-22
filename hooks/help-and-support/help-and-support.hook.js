import axiosPrivateClient from "@/lib/axios.private.client";
import { useMutation } from "@tanstack/react-query";
import { helpAndSupportService } from "@/services/help-and-support";
import toast from "react-hot-toast";


export const useHelpAndSupport = () => {

    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: createHelpAndSupport,
        isPending: isCreateHelpAndSupportPending
    } = useMutation({
        mutationKey: ["help-and-support"],

        mutationFn: async (payload) => {
            return await helpAndSupportService(axiosInstance, payload)
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Support request submitted successfully!");
        },
        onError: (error) => {
            const errData = error?.response?.data;
            const msg = errData?.message || errData?.detail || (typeof errData === "string" ? errData : "Something went wrong");
            toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
        }
    })

    return {
        createHelpAndSupport,
        isCreateHelpAndSupportPending
    }

}