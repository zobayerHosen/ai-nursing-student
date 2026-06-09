export const ChangePasswordService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/change-password/", payload);
  return response?.data;
};
