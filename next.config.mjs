/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        "*": false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user/signin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
