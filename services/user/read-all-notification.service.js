export const ReadAllNotificationServices = async (payload, axiosInstance) => {
  const response = await axiosInstance.post(
    "/notifications/bulk-update/",
    payload,
  );
  return response?.data;
};
