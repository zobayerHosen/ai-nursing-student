export const authService = {
    signin: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/login/", payload);
        return response?.data;
    },
    signup: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/register/", payload);
        return response?.data;
    },
    forgotPassword: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/forgot-password/", payload);
        return response?.data;
    },
    socialLogin: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/google-login/", payload);
        return response?.data;
    },
    resetPassword: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/set-new-password/", payload);
        return response?.data;
    },
    stepProfileSetup: async (axiosInstance, payload) => {
        const response = await axiosInstance.post("/profile/", payload);
        return response?.data;
    },
};
