import axiosPrivateClient from "@/lib/axios.private.client"
import { StudyNotesProgressService } from "@/services/core-learning";
import { useQuery } from "@tanstack/react-query";

export const useStudyNotesProgress = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["study-notes-progress"],
        queryFn: () => StudyNotesProgressService(axiosInstance),
    });

    return {
        content_summary: data?.content_summary,
        recentActivity: data?.recent_activity,
        topics: data?.topics,
        isLoading,
        isError,
        error
    }
}