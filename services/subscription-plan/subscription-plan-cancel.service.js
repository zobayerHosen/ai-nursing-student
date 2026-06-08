export const SubscriptionPlanCancelService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post(`/subscription/cancel/`, payload);
  return response?.data;
};