export const GetNotificationSettingsService = async (axiosInstance) => {
  const response = await axiosInstance.get("/notifications/preferences/");
  return response?.data;
};
