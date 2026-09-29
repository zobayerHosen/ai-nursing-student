export const nclexExamService = {
    getExamList: async (axiosInstance) => {
        const response = await axiosInstance.get("/nclex/exams/");
        return response?.data;
    },

    startExamAndResume: async (axiosInstance, examid) => {
        const response = await axiosInstance.post(`/nclex/exams/${examid}/start/`);
        return response?.data;
    },

    getSessionQuestions: async (axiosInstance, sessionId) => {
        const response = await axiosInstance.get(`/nclex/exams/session/${sessionId}/questions/`);
        return response?.data;
    },

    submitExamAnswer: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/nclex/exams/answer/", payload);
        return response?.data;
    },

    finishExam: async (axiosInstance, sessionId) => {
        const response = await axiosInstance.post(`/nclex/exams/finish/${sessionId}/`);
        return response?.data;
    },

    pauseExam: async (axiosInstance, sessionId, payload) => {
        const response = await axiosInstance.post(`/nclex/exams/session/${sessionId}/pause/`, payload);
        return response?.data;
    },

    resumeExam: async (axiosInstance, sessionId) => {
        const response = await axiosInstance.post(`/nclex/exams/session/${sessionId}/resume/`);
        return response?.data;
    },

    getExamReview: async (axiosInstance, sessionId) => {
        const response = await axiosInstance.get(`/nclex/exams/review/${sessionId}/`);
        return response?.data;
    },

    getPerformance: async (axiosInstance) => {
        const response = await axiosInstance.get(`/nclex/exams/performance/`);
        return response?.data;
    },
};