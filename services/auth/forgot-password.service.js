export const ForgotPasswordService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/forget-password", payload);
  return response?.data;
};