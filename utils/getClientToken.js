import Cookies from "js-cookie";

export function getClientToken() {
  if (typeof window === "undefined") return null;
  const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || "stemrn_auth");
  return token || null;
}
