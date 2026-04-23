export const SocialLoginService = async (payload, axiosInstance) => {
    const response = await axiosInstance.post("/social-login", payload)
    return response?.data
};
