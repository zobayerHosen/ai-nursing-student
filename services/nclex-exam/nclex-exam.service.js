export const nclexExamService = {
    getExamList: async (axiosInstance) => {
        const response = await axiosInstance.get("/nclex/exams/");
        return response?.data;
    },
};