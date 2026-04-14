"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export function GoogleOAuthAppProvider({
  children,
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "0000";

  if (!clientId) {
    console.warn(
      "⚠️ NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing. Google OAuth disabled.",
    );
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
