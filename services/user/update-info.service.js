export const UpdateInfoService = async (payload, axiosInstance) => {
  const response = await axiosInstance.patch("/account/", payload);
  return response?.data;
};
