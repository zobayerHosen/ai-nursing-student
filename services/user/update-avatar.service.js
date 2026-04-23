export const UpdateAvatarService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/update-avatar", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};
