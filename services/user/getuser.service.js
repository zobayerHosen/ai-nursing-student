import { AxiosInstance } from "axios";

export async function getUser(axiosInstance) {
  if (!axiosInstance) return null;
  try {
    const response = await axiosInstance.get("/me");
    return response?.data || {};
  } catch (err) {
    // $&
    throw err;
  }
}
