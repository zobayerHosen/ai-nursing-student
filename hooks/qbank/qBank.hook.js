import axiosPrivateClient from "@/lib/axios.private.client";
import {
    categoryListService,
    createSessionService,
    getExamQuestionService,
    submitAnswerService,
    finishExamService
} from "@/services";
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


// Start/Create session hook
export const useStartExam = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: startExam,
        isPending,
        data
    } = useMutation({
        mutationKey: ["start-exam"],
        mutationFn: (data) => createSessionService(axiosInstance, data),
    });

    return {
        startExam,
        data,
        isPending,
    }
};


// Get exam question by session id hook
export const useExamQuestion = (sessionId) => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isError,
        isFetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["exam-question", sessionId],
        queryFn: () => getExamQuestionService(axiosInstance, sessionId),
        enabled: !!sessionId,
    });

    return {
        sessionData: data?.data,
        examQuestion: data?.data?.questions ?? [],
        isError,
        isFetching,
        isLoading,
        refetch,
    }
};

// Submit answer hook
export const useSubmitAnswer = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: submitAnswer,
        isPending,
    } = useMutation({
        mutationKey: ["submit-answer"],
        mutationFn: (data) => submitAnswerService(axiosInstance, data),
    });

    return {
        submitAnswer,
        isPending,
    };
};

// Finish exam hook
export const useFinishExam = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: finishExam,
        isPending,
    } = useMutation({
        mutationKey: ["finish-exam"],
        mutationFn: (sessionId) => finishExamService(axiosInstance, sessionId),
    });

    return {
        finishExam,
        isPending,
    };
};

