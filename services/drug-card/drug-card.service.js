export const drugCardService = {
    getAllQucikActionsList: async (axiosInstance) => {
        const response = await axiosInstance.get('/quick-picks/');
        return response.data;
    },

    drugCardGenerator: async (axiosInstance, payload) => {
        const response = await axiosInstance.post('/generate/', payload);
        return response.data;
    },

    clearCache: async (axiosInstance, payload) => {
        const response = await axiosInstance.post('/cache/clear/', payload);
        return response.data;
    },

    getHistory: async (axiosInstance) => {
        const response = await axiosInstance.get('/drug-card/history/');
        return response.data;
    },

    getHistoryDetails: async (axiosInstance, id) => {
        const response = await axiosInstance.get(`/drug-card/history/${id}/`);
        return response.data;
    },

    deleteHistory: async (axiosInstance, id) => {
        const response = await axiosInstance.delete(`/drug-card/history/${id}/`);
        return response.data;
    },

    deleteAllHistory: async (axiosInstance) => {
        const response = await axiosInstance.delete('/drug-card/history/');
        return response.data;
    },
};
