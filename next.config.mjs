// Base remote patterns
const baseRemotePatterns = [
  {
    protocol: "https",
    hostname: "milesbanks.thewarriors.team",
  },
  {
    protocol: "https",
    hostname: "adc-tenbox-prod.imgix.net",
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
    hostname: "i.ytimg.com",
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

  transpilePackages: ["antd", "@ant-design/icons"],
};

export default nextConfig;
