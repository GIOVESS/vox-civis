/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unpkg.com'],
    unoptimized: true,
  },
  // Add transpilePackages to ensure Leaflet works correctly
  transpilePackages: ['react-leaflet', 'leaflet'],
  // Enable static exports for Capacitor
  output: 'export',
};

export default nextConfig;

