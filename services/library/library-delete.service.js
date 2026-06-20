export const DeleteLibraryService = async (id, axiosInstance) => {
  const response = await axiosInstance.delete(`/library/${id}/`);
  return response?.data;
};
