import axiosPrivateClient from "@/lib/axios.private.client";
import { categoryListService, getExamQuestionService, startExamService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

// category list get hook
export const useCategoryList = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isError,
        isFetching,
        isLoading,

    } = useQuery({
        queryKey: ["category-list"],
        queryFn: () => categoryListService(axiosInstance),
    });

    return {
        category: data?.data?.data ?? [],
        isError,
        isFetching,
        isLoading,
    }
};


// Start exam hook
export const useStartExam = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: startExam,
        isPending,
        data
    } = useMutation({
        mutationKey: ["start-exam"],
        mutationFn: (data) => startExamService(axiosInstance, data),
    });

    return {
        startExam,
        data,
        isPending,
    }
};


// Get exam question by exam id hook
export const useExamQuestion = (examId) => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isError,
        isFetching,
        isLoading,
    } = useQuery({
        queryKey: ["exam-question", examId],
        queryFn: () => getExamQuestionService(axiosInstance, examId),
        enabled: !!examId,
    });

    return {
        examQuestion: data?.data ?? [],
        isError,
        isFetching,
        isLoading,
    }
};

