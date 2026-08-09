import axiosPrivateClient from "@/lib/axios.private.client";
import { carePlanBuilderService } from "@/services/care-plan-builder";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGenerateCarePlan = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        mutateAsync: generateCarePlan,
        isPending: isGenerating,
        isError: isGenerateError,
        error: generateError
    } = useMutation({
        mutationKey: ['generate-care-plan'],
        mutationFn: (payload) => carePlanBuilderService.generateCarePlan(axiosInstance, payload),
    });

    return {
        generateCarePlan,
        isGenerating,
        isGenerateError,
        generateError,
        carePlanData: data,
    };
};

export const useCarePlanHistory = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading: isHistoryLoading,
        isError: isHistoryError,
        error: historyError
    } = useQuery({
        queryKey: ['care-plan-history'],
        queryFn: () => carePlanBuilderService.getCarePlanHistory(axiosInstance),
    });

    return {
        historyData: data?.data,
        isHistoryLoading,
        isHistoryError,
        historyError,
    };
};

export const useCarePlanHistoryDetails = (id) => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading: isDetailsLoading,
        isError: isDetailsError,
        error: detailsError
    } = useQuery({
        queryKey: ['care-plan-history-details', id],
        queryFn: () => carePlanBuilderService.getCarePlanHistoryDetails(axiosInstance, id),
        enabled: !!id,
    });

    return {
        detailsData: data?.data,
        isDetailsLoading,
        isDetailsError,
        detailsError,
    };
};

export const useDeleteCarePlanHistory = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: deleteHistory,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError
    } = useMutation({
        mutationFn: (id) => carePlanBuilderService.deleteCarePlanHistory(axiosInstance, id),
    });

    return {
        deleteHistory,
        isDeleting,
        isDeleteError,
        deleteError,
    };
};

export const useDeleteAllCarePlanHistory = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: deleteAllHistory,
        isPending: isDeletingAll,
        isError: isDeleteAllError,
        error: deleteAllError
    } = useMutation({
        mutationFn: () => carePlanBuilderService.deleteAllCarePlanHistory(axiosInstance),
    });

    return {
        deleteAllHistory,
        isDeletingAll,
        isDeleteAllError,
        deleteAllError,
    };
};
