export const ResetPasswordService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/reset-password", payload);
  return response?.data;
};
