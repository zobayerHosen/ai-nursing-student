export const GetProcedureLookupService = async (axiosInstance) => {
  const response = await axiosInstance.get("/procedure/");
  return response?.data;
};
