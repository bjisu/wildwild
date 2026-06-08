"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Lang = "ko" | "en" | "zh" | "ja";

interface Slide {
  src: string;
  caption: string;
  captionEn: string;
  captionZh: string;
  captionJa: string;
}

interface SlideshowProps {
  slides: readonly Slide[];
  lang: Lang;
}

function getCaption(slide: Slide, lang: Lang) {
  if (lang === "ko") return slide.caption;
  if (lang === "zh") return slide.captionZh;
  if (lang === "ja") return slide.captionJa;
  return slide.captionEn;
}

export function Slideshow({ slides, lang }: SlideshowProps) {
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
                  alt={getCaption(slide, lang)}
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                <Placeholder n={i + 1} lang={lang} />
              )}
            </figure>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label={lang === "ko" ? "이전 사진" : "Previous"}
            onClick={() => go(-1)}
            className="pointer-events-auto h-10 w-10 bg-black/30 text-white backdrop-blur hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={lang === "ko" ? "다음 사진" : "Next"}
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
    </div>
  );
}

function Placeholder({ n, lang }: { n: number; lang: Lang }) {
  const text =
    lang === "ko"
      ? `사진 ${n} 자리 — /public/images 에 이미지를 넣으세요`
      : `Photo ${n} placeholder — add image to /public/images`;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black text-[var(--color-muted)]">
      <ImageOff className="h-10 w-10 opacity-60" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
