export const UpdateInfoService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/account/", payload);
  return response?.data;
};
