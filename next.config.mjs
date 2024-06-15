/** @type {import('next').NextConfig} */
const nextConfig = {
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
