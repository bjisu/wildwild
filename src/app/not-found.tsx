// 없는 주소 진입 시 오류 화면(/error) 으로 보내기 위한 안내 화면.
// (정적 export 환경에서는 클라이언트가 not-found 를 렌더링하면 곧장 /error 로 이동)
"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.location.replace("/error");
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-center">
      <p className="text-base font-medium text-[var(--color-fg)]">
        공식 굿즈를 통해서 이용해주세요.
      </p>
    </main>
  );
}
