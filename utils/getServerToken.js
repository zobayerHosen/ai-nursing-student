import { cookies } from "next/headers";

export async function getServerToken() {
  const cookieStore = await cookies();

  const cookieName = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

  if (!cookieName) {
    throw new Error("Auth token name is not defined in env");
  }

  const token = cookieStore.get(cookieName)?.value ?? null;

  return token;
}
