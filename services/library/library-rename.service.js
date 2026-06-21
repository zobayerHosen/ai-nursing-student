export const RenameLibraryService = async (id, payload, axiosInstance) => {
  const response = await axiosInstance.patch(`/library/${id}/`, payload);
  return response?.data;
};
