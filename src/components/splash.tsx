"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SplashProps {
  /** 스플래시가 떠 있는 시간(ms). 기본 3000ms = 3초 */
  duration?: number;
  /** 스플래시가 끝나면 호출됩니다. */
  onFinish: () => void;
}

export function Splash({ duration = 3000, onFinish }: SplashProps) {
  // 사라지기 직전 페이드아웃을 위한 상태
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    // duration 동안 보여준 뒤, 페이드아웃(500ms) 후 완전히 제거
    const fadeTimer = window.setTimeout(() => setLeaving(true), duration);
    const doneTimer = window.setTimeout(onFinish, duration + 500);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black transition-opacity duration-500 ease-out",
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <div className="absolute left-1/2 top-1/2 w-64 max-w-[70vw] -translate-x-1/2 -translate-y-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo_red.png"
          alt="WWZD"
          className="block h-auto w-full animate-splash-in object-contain"
        />
      </div>
    </div>
  );
}
