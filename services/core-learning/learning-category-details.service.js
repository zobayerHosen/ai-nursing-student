export const LearningCategoryDetailsService = async (axiosInstance, id) => {
    const response = await axiosInstance.get(`/learning/category/${id}/`);
    return response?.data;
};