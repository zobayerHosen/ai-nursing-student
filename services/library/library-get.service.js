export const GetLibraryService = async (axiosInstance) => {
  const response = await axiosInstance.get("/library/");
  return response?.data;
};
