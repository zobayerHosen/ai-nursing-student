export const coreLearningService = {
    getCoreLearning: async (axiosInstance) => {
        const response = await axiosInstance.get(`/learning/study_notes/`);
        return response?.data;
    },


    getStudyNotesSubCategories: async (axiosInstance, id) => {
        const response = await axiosInstance.get(`/learning/category/${id}/`);
        return response?.data;
    },




    saveNote: async (axiosInstance, payload) => {
        const response = await axiosInstance.post(`/save-note/`, payload);
        return response?.data;
    },
    markComplete: async (axiosInstance, id, payload) => {
        const response = await axiosInstance.post(`/mark-as-completed/${id}/`, payload);
        return response?.data;
    },
    getContentDetails: async (axiosInstance, id) => {
        const response = await axiosInstance.get(`/learning/content/${id}/`);
        return response?.data;
    },

    getStudyNotesProgress: async (axiosInstance) => {
        const response = await axiosInstance.get(`/study-notes/progress/`);
        return response?.data?.data;
    },
};
