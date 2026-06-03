export const UpdateAvatarService = async (payload, axiosInstance) => {
  const response = await axiosInstance.patch("/account/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};
