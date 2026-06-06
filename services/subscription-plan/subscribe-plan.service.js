export const SubscriptionPlanServices = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/subscribe/", payload);

  return response?.data;
};
