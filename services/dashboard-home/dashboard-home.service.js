export const dashboardHomeService = {
  getDashboardHomeData: async (axiosInstance) => {
    const response = await axiosInstance.get("/dashboard/");
    return response.data;
  },
};