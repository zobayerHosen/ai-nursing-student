export const CreateLibraryService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/library/", payload);
  return response?.data;
};
