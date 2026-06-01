import axiosPublic from "@/lib/axios.public";
import { useQuery } from "@tanstack/react-query";


const useNursingProgramOptions = () => {

    const axiosInstance = axiosPublic();

    const { data: nursingProgramData } = useQuery({
        queryKey: ["nursing-program-data"],
        queryFn: async () => {
            const response = await axiosInstance.get("/options/programs/");
            return response?.data?.data;
        },
    });

    return {
        nursingProgramData,
    };
}

export default useNursingProgramOptions;