export const GetModuleByIdService = async (id, axiosInstance) => {
  const response = await axiosInstance.get(`/module/${id}/`);
  return response?.data;
};
