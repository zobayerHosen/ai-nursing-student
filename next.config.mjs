// Base remote patterns
const baseRemotePatterns = [
  {
    protocol: "https",
    hostname: "i.pravatar.cc",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "source.unsplash.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "publicresources.bid4assets.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "media-cldnry.s-nbcnews.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "media.giphy.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "picsum.photos",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "loremflickr.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "assets.mixkit.co",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "stemrn.softvencealpha.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "stemrn.softvencealpha.com",
    port: "",
    pathname: "/**",
  },
];

// Dynamic backend pattern
const dynamicBackendPattern = process.env.NEXT_PUBLIC_BASE_URL
  ? [
      {
        protocol: "https",
        hostname: new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname,
        port: "",
        pathname: "/**",
      },
    ]
  : [];

const nextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [...baseRemotePatterns, ...dynamicBackendPattern],
  },

  devIndicators: {
    position: "bottom-right",
  },

  transpilePackages: ["antd", "@ant-design/icons"],
};

export default nextConfig;
