export const VideoProgressService = async (id, payload, axiosInstance) => {
  const response = await axiosInstance.post(`/video/progress/${id}/`, payload);
  return response?.data;
};
