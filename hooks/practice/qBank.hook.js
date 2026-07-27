import axiosPrivateClient from "@/lib/axios.private.client";
import { categoryListService } from "@/services";
import { useQuery } from "@tanstack/react-query";

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
