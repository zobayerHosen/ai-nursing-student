export const MarkCompleteService = async (id, payload, axiosInstance) => {
  const response = await axiosInstance.post(`/learning/mark-complete/${id}/`, payload);
  return response?.data;
};
