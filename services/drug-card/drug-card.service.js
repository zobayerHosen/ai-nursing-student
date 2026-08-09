export const drugCardService = {
    getAllQucikActionsList: async (axiosInstance) => {
        const response = await axiosInstance.get('/quick-picks/');
        return response.data;
    },

    drugCardGenerator: async (axiosInstance, payload) => {
        const response = await axiosInstance.post('/generate/', payload);
        return response.data;
    },

};