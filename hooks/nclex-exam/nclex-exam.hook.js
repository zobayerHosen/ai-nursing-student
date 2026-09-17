import axiosPrivateClient from "@/lib/axios.private.client";
import { nclexExamService } from "@/services";
import { useQuery } from "@tanstack/react-query";

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