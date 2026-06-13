export const GetTermsAndConditionsService = async (axiosInstance) => {
  const response = await axiosInstance.get("/pages/terms-conditions/");
  return response?.data;
};
