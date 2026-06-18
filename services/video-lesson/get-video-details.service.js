export const GetVideoDetailsService = async (id, axiosInstance) => {
  const response = await axiosInstance.get(`/video/${id}/`);
  return response?.data;
};
