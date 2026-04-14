"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || "stemrn_auth";

/**
 * Custom hook that returns a private Axios instance
 * with auth header and 401 redirect handling.
 */
export function axiosPrivateClient() {
  const router = useRouter();
  const token = Cookies.get(ACCESS_TOKEN_KEY) || null;

  const instance = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        Cookies.remove(ACCESS_TOKEN_KEY);
        router.push("/");
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

export default axiosPrivateClient;
