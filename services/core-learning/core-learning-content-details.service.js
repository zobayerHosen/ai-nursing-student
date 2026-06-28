export const GetCoreLearningContentDetailsService = async (id, axiosInstance) => {
  const response = await axiosInstance.get(`/learning/content/${id}/`);
  return response?.data;
};
