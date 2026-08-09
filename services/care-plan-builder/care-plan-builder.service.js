export const carePlanBuilderService = {
    generateCarePlan: async (axiosInstance, payload) => {
        const response = await axiosInstance.post('/care-plans/', payload);
        return response.data;
    },
    getCarePlanHistory: async (axiosInstance) => {
        const response = await axiosInstance.get('/care-plans/history/');
        return response.data;
    },
    getCarePlanHistoryDetails: async (axiosInstance, id) => {
        const response = await axiosInstance.get(`/care-plans/history/${id}/`);
        return response.data;
    },
    deleteCarePlanHistory: async (axiosInstance, id) => {
        const response = await axiosInstance.delete(`/care-plans/history/${id}/`);
        return response.data;
    },
    deleteAllCarePlanHistory: async (axiosInstance) => {
        const response = await axiosInstance.delete('/care-plans/history/');
        return response.data;
    }
};
