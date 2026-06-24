export const SaveNoteService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post(`/save-note/`, payload);
  return response?.data;
};