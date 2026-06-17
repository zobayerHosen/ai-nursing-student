export const GetModulesService = async (axiosInstance) => {
  const response = await axiosInstance.get("/module/");
  return response?.data;
};
