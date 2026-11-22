/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react', 'lenis', 'gsap'],
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
