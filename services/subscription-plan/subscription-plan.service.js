export const subscriptionPlanService = {
  subscribePlan: async (axiosInstance, payload) => {
    const response = await axiosInstance.post("/subscribe/", payload);
    return response?.data;
  },
  cancelSubscription: async (axiosInstance, payload) => {
    const response = await axiosInstance.post("/subscription/cancel/", payload);
    return response?.data;
  },
  getPlans: async (axiosInstance) => {
    const response = await axiosInstance.get("/plans/");
    return response?.data;
  },
  getMySubscription: async (axiosInstance) => {
    const response = await axiosInstance.get("/subscription/my/");
    return response?.data;
  },
  getPaymentHistory: async (axiosInstance) => {
    const response = await axiosInstance.get("/payment-history/");
    return response?.data;
  },
};
