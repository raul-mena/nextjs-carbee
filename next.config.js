/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.API_URL;
    return [
      {
        source: "/auth/login",
        destination: `${apiUrl}/api/auth`,
      },
      {
        source: "/appointments",
        destination: `${apiUrl}/api/appointments`,
      },
      {
        source: "/availability/:path*",
        destination: `${apiUrl}/api/availability/:path*`,
      }
    ];
  },
}

module.exports = nextConfig
