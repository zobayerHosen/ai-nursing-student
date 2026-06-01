export const StepProfileSetupService = async (payload, axiosInstance) => {
    const response = await axiosInstance.post("/profile/", payload)
    return response?.data
};
