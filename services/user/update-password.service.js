export const UpdatePasswordService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/update-password", payload);
  return response?.data;
};
