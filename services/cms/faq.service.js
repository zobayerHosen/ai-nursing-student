export const GetFaqService = async (axiosInstance) => {
  const response = await axiosInstance.get("/faqs/");
  return response?.data;
};
