export const ForgotPasswordService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/forgot-password/", payload);
  return response?.data;
};