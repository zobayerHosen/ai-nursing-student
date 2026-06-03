export const ResetPasswordService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/set-new-password/", payload);
  return response?.data;
};
