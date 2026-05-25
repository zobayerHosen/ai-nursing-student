import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Creates a pre-configured Axios instance for public API requests.
 * @returns {AxiosInstance} A configured Axios instance.
 */
export function axiosPublic() {
  const instance = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};
export default axiosPublic;