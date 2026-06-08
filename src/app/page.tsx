// 홈 직접 진입은 오류 경로로 보냅니다.
// (정적 export 환경 호환을 위해 클라이언트 측에서 이동)
"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/error");
  }, []);

  // 이동 전 잠깐 보이는 폴백 화면
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-center">
      <p className="text-base font-medium text-[var(--color-fg)]">
        공식 굿즈를 통해서 이용해주세요.
      </p>
    </main>
  );
}
