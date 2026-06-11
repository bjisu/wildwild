"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  caption: string;
}

interface SlideshowProps {
  slides: readonly Slide[];
}

export function Slideshow({ slides }: SlideshowProps) {
  const [index, setIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const count = slides.length;

  const go = React.useCallback(
    (dir: number) => {
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-black sm:aspect-[4/5]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <figure
              key={i}
              className="relative flex h-full w-full shrink-0 items-center justify-center bg-black"
            >
              {slide.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={slide.caption}
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                <Placeholder n={i + 1} />
              )}
            </figure>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="이전 사진"
            onClick={() => go(-1)}
            className="pointer-events-auto h-10 w-10 bg-black/30 text-white backdrop-blur hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="다음 사진"
            onClick={() => go(1)}
            className="pointer-events-auto h-10 w-10 bg-black/30 text-white backdrop-blur hover:bg-black/50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index
                ? "w-7 bg-[var(--color-accent)]"
                : "w-2 bg-[var(--color-border)]"
            )}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-8">
        <a
          href="https://linktr.ee/wildwild_official?utm_source=linktree_profile_share&ltsid=5a8046f3-3413-4e21-9156-4b29373d45e3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="티켓"
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all hover:brightness-125 active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ticket.webp" alt="" className="h-9 w-9 [filter:brightness(0)_invert(1)]" />
        </a>
        <a
          href="https://www.w2company.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="공식 홈페이지"
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all hover:brightness-125 active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home.webp" alt="" className="h-9 w-9 [filter:brightness(0)_invert(1)]" />
        </a>
        <a
          href="https://www.instagram.com/wildwild_official"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램"
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full transition-all hover:brightness-125 active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/instagram.webp" alt="" className="h-9 w-9 [filter:brightness(0)_invert(1)]" />
        </a>
      </div>
    </div>
  );
}

function Placeholder({ n }: { n: number }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black text-[var(--color-muted)]">
      <ImageOff className="h-10 w-10 opacity-60" />
      <p className="text-sm">사진 {n} 자리 — /public/images 에 이미지를 넣으세요</p>
    </div>
  );
}
