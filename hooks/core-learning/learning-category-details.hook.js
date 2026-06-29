import { LearningCategoryDetailsService } from "@/services/core-learning";
import { useQuery } from "@tanstack/react-query";
import axiosPrivateClient from "@/lib/axios.private.client";

export const useLearningCategoryDetails = (id) => {
    const axiosInstance = axiosPrivateClient();

    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ["learning-category-details", id],
        queryFn: () => LearningCategoryDetailsService(axiosInstance, id),
        staleTime: 2 * 60 * 1000,
        retry: false,
        enabled: !!id,
    });

    console.log("Raw query data:", data);

    return {
        learningCategoryDetailsData: data?.data?.data || data?.data || data,
        isLoading,
        isError,
        isFetching,
        error
    };
};