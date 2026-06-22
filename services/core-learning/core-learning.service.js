export const CoreLearningService = async (pathName, axiosInstance) => {
  const response = await axiosInstance.get(`/learning/${pathName}/`);
  return response?.data;
};
