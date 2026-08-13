import axiosPrivateClient from "@/lib/axios.private.client"
import { drugCardService } from "@/services/drug-card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCardQuickList = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading: isQuickActionsLoading,
        isError: isQuickActionsError,
        error: quickActionsError
    } = useQuery({
        queryKey: ['quick-list'],
        queryFn: () => drugCardService.getAllQucikActionsList(axiosInstance),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return {
        quickActionsData: data?.data?.drugs,
        isQuickActionsLoading,
        isQuickActionsError,
        quickActionsError,
    };
}

export const useCardGenerator = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        mutateAsync: cardGenerator,
        isPending: isGeneratorPending,
        isError: isGeneratorError,
        error: generatorError
    } = useMutation({
        mutationKey: ['drug-card-generate'],
        mutationFn: (payload) => drugCardService.drugCardGenerator(axiosInstance, payload),
    });

    return {
        cardGenerator,
        isGeneratorPending,
        isGeneratorError,
        generatorError,
        generatorData: data,
    };
};

export const useClearCache = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        mutateAsync: clearCache,
        isPending: isClearingCache,
        isError: isClearCacheError,
        error: clearCacheError
    } = useMutation({
        mutationFn: (payload) => drugCardService.clearCache(axiosInstance, payload),
    });

    return {
        clearCache,
        isClearingCache,
        isClearCacheError,
        clearCacheError,
        clearCacheData: data,
    };
};

export const useDrugCardHistory = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading: isHistoryLoading,
        isError: isHistoryError,
        error: historyError,
        refetch: refetchHistory
    } = useQuery({
        queryKey: ['drug-card-history'],
        queryFn: () => drugCardService.getHistory(axiosInstance),
    });

    return {
        historyData: data?.data,
        isHistoryLoading,
        isHistoryError,
        historyError,
        refetchHistory,
    };
};

export const useDrugCardHistoryDetails = (id) => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading: isDetailsLoading,
        isError: isDetailsError,
        error: detailsError
    } = useQuery({
        queryKey: ['drug-card-history-details', id],
        queryFn: () => drugCardService.getHistoryDetails(axiosInstance, id),
        enabled: !!id,
    });

    return {
        detailsData: data?.data,
        isDetailsLoading,
        isDetailsError,
        detailsError,
    };
};

export const useDeleteDrugCardHistory = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: deleteHistory,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError
    } = useMutation({
        mutationFn: (id) => drugCardService.deleteHistory(axiosInstance, id),
        onSuccess: (data) => {
            toast.success(data?.data?.message || "History deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['drug-card-history'] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to delete history");
        }
    });

    return {
        deleteHistory,
        isDeleting,
        isDeleteError,
        deleteError,
    };
};

export const useDeleteAllDrugCardHistory = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: deleteAllHistory,
        isPending: isDeletingAll,
        isError: isDeleteAllError,
        error: deleteAllError
    } = useMutation({
        mutationFn: () => drugCardService.deleteAllHistory(axiosInstance),
        onSuccess: (data) => {
            toast.success(data?.data?.message || "History deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['drug-card-history'] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to delete history");
        }
    });

    return {
        deleteAllHistory,
        isDeletingAll,
        isDeleteAllError,
        deleteAllError,
    };
};