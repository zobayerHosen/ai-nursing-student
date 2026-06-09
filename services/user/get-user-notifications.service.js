export const GetUserNotificationsService = async (axiosInstance) => {
  const response = await axiosInstance.get("/notifications/");
  return response?.data;
};
