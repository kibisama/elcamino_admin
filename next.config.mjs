/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4334",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
