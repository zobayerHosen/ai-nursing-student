import axiosPrivateClient from "@/lib/axios.private.client"
import { drugCardService } from "@/services/drug-card";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useCardQuickList = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading:isQuickActionsLoading,
        isError:isQuickActionsError,
        error:quickActionsError
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
        mutationFn: (payload) => drugCardService.drugCardGenerator(axiosInstance, payload),
    });

    return {
        cardGenerator,
        isGeneratorPending,
        isGeneratorError,
        generatorError,
        generatorData:data,
    };
}
