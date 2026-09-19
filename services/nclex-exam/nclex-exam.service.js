export const nclexExamService = {
    getExamList: async (axiosInstance) => {
        const response = await axiosInstance.get("/nclex/exams/");
        return response?.data;
    },

    startExamAndResume: async (axiosInstance, examid) => {
        const response = await axiosInstance.post(`/nclex/exams/${examid}/start/`);
        return response?.data;
    },
};