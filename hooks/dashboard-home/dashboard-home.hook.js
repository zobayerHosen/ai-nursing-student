import axiosPrivateClient from "@/lib/axios.private.client";
import { dashboardHomeService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardHomeData = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error
    } = useQuery({
        queryKey: ["dashboard-home-data"],
        queryFn: () => dashboardHomeService.getDashboardHomeData(axiosInstance),
    });

    return {
        dashboardData: data?.data,
        isLoading,
        isFetching,
        isError,
        error
    };
};