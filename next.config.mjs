/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // En el proyecto demo (visium-demo) la raíz sirve la landing nueva de /v2.
  // La variable solo existe en ese proyecto de Vercel; visium-web no cambia.
  async rewrites() {
    if (process.env.DEMO_ROOT_V2 !== "1") return [];
    return [{ source: "/", destination: "/v2" }];
  },
};

export default nextConfig;
