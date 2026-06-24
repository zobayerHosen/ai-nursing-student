export const MarkCompleteService = async (id, payload, axiosInstance) => {
  const response = await axiosInstance.post(`/mark-as-completed/${id}/`, payload);
  return response?.data;
};
