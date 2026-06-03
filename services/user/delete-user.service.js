export async function DeleteUserService(axiosInstance) {
  if (!axiosInstance) return null;
  try {
    const response = await axiosInstance.delete("/account/");
    return response?.data || {};
  } catch (err) {
    // $&
    throw err;
  }
}
