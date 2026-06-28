export const LearningCategoryDetailsService = async (id, axiosInstance) => {
    const response = await axiosInstance.get(`/learning/category/${id}/`);
    return response?.data?.data;
};