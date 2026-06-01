import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";


const useHearAboutOptions = () => {

    const axiosInstance = axiosPublic();

    const { data: hearAboutData } = useQuery({
        queryKey: ["hear-about-data"],
        queryFn: async () => {
            const response = await axiosInstance.get("/options/sources/");
            return response?.data?.data;
        },
    });

    return {
        hearAboutData,
    };
}

export default useHearAboutOptions;