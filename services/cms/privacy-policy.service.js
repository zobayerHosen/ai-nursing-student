export const GetPrivacyPolicyService = async (axiosInstance) => {
  const response = await axiosInstance.get("/pages/privacy-policy/");
  return response?.data;
};
