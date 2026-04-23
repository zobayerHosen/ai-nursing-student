export async function DeleteUserService(axiosInstance) {
  if (!axiosInstance) return null;
  try {
    const response = await axiosInstance.delete("/delete-profile");
    return response?.data || {};
  } catch (err) {
    // $&
    throw err;
  }
}
