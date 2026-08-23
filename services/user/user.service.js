export const userService = {
  getUser: async (axiosInstance) => {
    if (!axiosInstance) return null;
    const response = await axiosInstance.get("/profile/");
    return response?.data || {};
  },
  changePassword: async (axiosInstance, payload) => {
    const response = await axiosInstance.post("/change-password/", payload);
    return response?.data;
  },
  updatePassword: async (axiosInstance, payload) => {
    const response = await axiosInstance.post("/update-password", payload);
    return response?.data;
  },
  updateInfo: async (axiosInstance, payload) => {
    const response = await axiosInstance.patch("/account/", payload);
    return response?.data;
  },
  updateAvatar: async (axiosInstance, payload) => {
    const response = await axiosInstance.patch("/account/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  },
  deleteUserImage: async (axiosInstance) => {
    if (!axiosInstance) return null;
    const response = await axiosInstance.patch("/account/", {
      remove_profile_photo: true,
    });
    return response?.data || {};
  },
  deleteUser: async (axiosInstance) => {
    if (!axiosInstance) return null;
    const response = await axiosInstance.delete("/account/");
    return response?.data || {};
  },
  getNotificationSettings: async (axiosInstance) => {
    const response = await axiosInstance.get("/notifications/preferences/");
    return response?.data;
  },
  updateNotificationSettings: async (axiosInstance, payload) => {
    const response = await axiosInstance.patch("/notifications/preferences/", payload);
    return response?.data;
  },
  getUserNotifications: async (axiosInstance) => {
    const response = await axiosInstance.get("/notifications/");
    return response?.data;
  },
  readAllNotification: async (axiosInstance, payload) => {
    const response = await axiosInstance.post(
      "/notifications/bulk-update/",
      payload
    );
    return response?.data;
  },
};
