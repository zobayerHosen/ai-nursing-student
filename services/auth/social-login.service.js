export const SocialLoginService = async (payload, axiosInstance) => {
    const response = await axiosInstance.post("/google-login/", payload)
    return response?.data
};
