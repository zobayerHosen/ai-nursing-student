import { Providers } from "@/providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getServerToken } from "@/utils/getServerToken";
import { userService } from "@/services";
import { axiosPrivateServer } from "@/lib/axios.private.server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

// meta
export const metadata = {
  title: "Stemrn",
  description:
    "Never Miss a Property Auction Again. Automatically get real estate and land auction listings from multiple sources delivered to your dashboard and inbox every week.",
};

export default async function RootLayout({ children }) {

  // Note: create query client
  const queryClient = new QueryClient();

  // Note: get token
  const token = await getServerToken();

  // Note: prefetch user
  if (token) {
    const axiosInstance = await axiosPrivateServer();

    try {
      await queryClient.prefetchQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const userData = await userService.getUser(axiosInstance);
          return userData;
        },
      });
    } catch (error) {
      // swallow error to avoid crashing layout
    };
  };

  // Note: dehydrate
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <AntdRegistry>
          <Providers>
            <HydrationBoundary state={dehydratedState}>
              {children}
            </HydrationBoundary>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
};