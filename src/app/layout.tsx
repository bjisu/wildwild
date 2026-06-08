import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "와일드와일드 샘플 | Official Merch",
  description:
    "와일드와일드 샘플 공연장 한정 굿즈. 포토카드와 포스터를 현장에서 만나보세요.",
  openGraph: {
    title: "와일드와일드 샘플 | Official Merch",
    description: "공연장 한정 굿즈를 가장 먼저 만나보세요.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
