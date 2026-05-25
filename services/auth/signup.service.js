export const SignupService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/register/", payload);
  return response?.data;
};