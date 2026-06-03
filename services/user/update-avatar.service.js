export const UpdateAvatarService = async (payload, axiosInstance) => {
  const response = await axiosInstance.post("/account/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};
