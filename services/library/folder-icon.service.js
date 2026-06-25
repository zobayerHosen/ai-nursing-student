export const GetFolderIconService = async (axiosInstance) => {
  const response = await axiosInstance.get("/icons/");
  return response?.data;
};
