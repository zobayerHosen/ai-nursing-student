export const nclexExamService = {
    getExamCategory: async (axiosInstance) => {
        const response = await axiosInstance.get("");
        return response?.data;
    },
};