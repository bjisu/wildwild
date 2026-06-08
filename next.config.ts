import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 배포를 위한 설정.
  // 동적 서버 기능(Supabase 등)을 붙일 때는 output을 제거하고
  // @cloudflare/next-on-pages 어댑터로 전환하세요.
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
