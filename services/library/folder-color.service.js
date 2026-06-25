export const GetFolderColorService = async (axiosInstance) => {
  const response = await axiosInstance.get("/color/");
  return response?.data;
};
