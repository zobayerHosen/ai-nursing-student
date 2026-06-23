export const SaveNoteService = async (id, payload, axiosInstance) => {
  const response = await axiosInstance.post(`/learning/save-note/${id}/`, payload);
  return response?.data;
};
