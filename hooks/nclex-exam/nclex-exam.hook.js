import axiosPrivateClient from "@/lib/axios.private.client";
import { nclexExamService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetExamList = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["exam-list"],
        queryFn: async () => {
            const response = await nclexExamService.getExamList(axiosInstance);
            return response?.data;
        },
    });

    return {
        examsCategoryList: data?.exams ?? [],
        totalExams: data?.total_exams ?? 0,
        completedExams: data?.completed_exams ?? 0,
        isLoading,
        isError,
        refetch,
    };
};

export const useStartExam = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: startExam,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async (examId) => {
            const response = await nclexExamService.startExamAndResume(axiosInstance, examId);
            return response?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam-list"] });
        },
    });

    return {
        startExam,
        isPending,
        isError,
        error,
    };
};

export const useGetSessionQuestions = (sessionId) => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["nclex-session-questions", sessionId],
        queryFn: async () => {
            const response = await nclexExamService.getSessionQuestions(axiosInstance, sessionId);
            return response?.data;
        },
        enabled: !!sessionId,
    });

    return {
        sessionData: data,
        questions: data?.questions ?? [],
        currentQuestionIndex: data?.current_question_index ?? 0,
        remainingSeconds: data?.remaining_seconds ?? 0,
        answeredQuestionIds: data?.answered_question_ids ?? [],
        flaggedQuestionIds: data?.flagged_question_ids ?? [],
        isCompleted: data?.is_completed ?? false,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useSubmitExamAnswer = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: submitAnswer,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async (payload) => {
            const response = await nclexExamService.submitExamAnswer(axiosInstance, payload);
            return response?.data;
        },
    });

    return {
        submitAnswer,
        isPending,
        isError,
        error,
    };
};

export const useFinishExam = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: finishExam,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async (sessionId) => {
            const response = await nclexExamService.finishExam(axiosInstance, sessionId);
            return response?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam-list"] });
        },
    });

    return {
        finishExam,
        isPending,
        isError,
        error,
    };
};

export const usePauseExam = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: pauseExam,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async (params) => {
            const sessionId = typeof params === "object" ? params?.sessionId : params;
            const payload = typeof params === "object" ? params?.payload : undefined;
            const response = await nclexExamService.pauseExam(axiosInstance, sessionId, payload);
            return response?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam-list"] });
            queryClient.invalidateQueries({ queryKey: ["nclex-session-questions"] });
        },
    });

    return {
        pauseExam,
        isPending,
        isError,
        error,
    };
};

export const useResumeExam = () => {
    const axiosInstance = axiosPrivateClient();
    const queryClient = useQueryClient();

    const {
        mutateAsync: resumeExam,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async (sessionId) => {
            const response = await nclexExamService.resumeExam(axiosInstance, sessionId);
            return response?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exam-list"] });
            queryClient.invalidateQueries({ queryKey: ["nclex-session-questions"] });
        },
    });

    return {
        resumeExam,
        isPending,
        isError,
        error,
    };
};

export const useGetExamReview = (sessionId) => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["nclex-exam-review", sessionId],
        queryFn: async () => {
            const response = await nclexExamService.getExamReview(axiosInstance, sessionId);
            return response?.data;
        },
        enabled: !!sessionId,
    });

    return {
        reviewData: data,
        isLoading,
        isError,
        error,
        refetch,
    };
};

export const useNclexPerformance = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["nclex-performance"],
        queryFn: async () => {
            const response = await nclexExamService.getPerformance(axiosInstance);
            return response?.data;
        },
    });

    return {
        performanceData: data,
        isLoading,
        isError,
        error,
        refetch,
    };
};