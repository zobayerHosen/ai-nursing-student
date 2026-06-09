export const UpdateNotificationSettingsService = async (payload, axiosInstance) => {
  const response = await axiosInstance.patch("/notifications/preferences/", payload);
  return response?.data;
};
