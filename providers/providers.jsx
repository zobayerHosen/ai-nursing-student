"use client";

import { GoogleOAuthAppProvider } from "./google-oauth.provider";
import { ReactQueryProvider } from "./react-query.provider";
import { ToasterProvider } from "./toaster.provider";

export default function Providers({ children }) {
  return (
    <ReactQueryProvider>
      <GoogleOAuthAppProvider>
        {children}
        <ToasterProvider />
      </GoogleOAuthAppProvider>
    </ReactQueryProvider>
  );
}

