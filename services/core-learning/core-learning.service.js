export const CoreLearningService = async (pathName, axiosInstance, params = {}) => {
  const response = await axiosInstance.get(`/learning/${pathName}/`, { params });
  return response?.data;
};
