export async function getUser(axiosInstance) {
  if (!axiosInstance) return null;
  try {
    const response = await axiosInstance.get("/profile/");
    return response?.data || {};
  } catch (err) {
    // $&
    throw err;
  }
}