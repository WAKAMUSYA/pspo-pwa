import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Silence the webpack/turbopack mismatch error
    // Set explicit root to avoid multiple lockfiles warning
    root: '.',
  },
};

export default withPWA(nextConfig);
