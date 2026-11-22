/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['lucide-react', 'lenis', 'gsap'],
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
