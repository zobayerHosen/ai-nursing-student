
import { Providers } from "@/providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}