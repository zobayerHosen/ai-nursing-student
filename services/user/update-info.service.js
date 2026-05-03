export const UpdateInfoService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/update-profile", payload);
  return response?.data;
};
