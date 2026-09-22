const helpAndSupportService = async (axiosInstance, payload) => {
    const response = await axiosInstance.post(`/cms/help-center/`, payload);
    return response?.data;
};

export { helpAndSupportService };