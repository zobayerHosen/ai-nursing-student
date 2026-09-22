const helpAndSupportService = async (axiosInstance, payload) => {
    const response = await axiosInstance.post(`/cms/help-center/`, payload);
    return response?.data;
};

const getHelpAndSupportListService = async (axiosInstance) => {
    const response = await axiosInstance.get(`/cms/help-center/`);
    return response?.data;
};

export { 
    helpAndSupportService,
    helpAndSupportService as createHelpAndSupportService,
    getHelpAndSupportListService,
    getHelpAndSupportListService as getHelpAndSupportService
};