import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";


const useStateCountryOptions = () => {

    const axiosInstance = axiosPublic();

    const { data: stateCountryData } = useQuery({
        queryKey: ["state-country-data"],
        queryFn: async () => {
            const response = await axiosInstance.get("/options/states/");
            return response?.data?.data;
        },
    });

    return {
        stateCountryData,
    };
}

export default useStateCountryOptions;