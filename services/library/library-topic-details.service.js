export const GetLibraryTopicDetailsService = async (id, axiosInstance) => {
  const response = await axiosInstance.get(`/library/content/${id}/`);
  return response?.data;
};
