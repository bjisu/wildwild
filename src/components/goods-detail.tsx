"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Splash } from "@/components/splash";
import { Slideshow } from "@/components/slideshow";
import type { Goods } from "@/lib/goods";

type Lang = "ko" | "en" | "zh" | "ja";

const langOptions: { value: Lang; label: string }[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
];

function pick(lang: Lang, ko: string, en: string, zh: string, ja: string) {
  if (lang === "ko") return ko;
  if (lang === "zh") return zh;
  if (lang === "ja") return ja;
  return en;
}

export function GoodsDetail({ goods }: { goods: Goods }) {
  const [lang, setLang] = React.useState<Lang>("ko");
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <div className="page-background min-h-dvh">
        <main
          lang={lang}
          className="mx-auto max-w-md px-5 pb-16 pt-6 text-[var(--color-fg)]"
        >
        <div className="mb-8 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo_red.png" alt="WildWild" className="h-15 w-auto" />
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="cursor-pointer appearance-none rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 pl-3 pr-6 text-xs font-semibold text-[var(--color-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              {langOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--color-muted)]" />
          </div>
        </div>

        <header className="mb-8">
          <span className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)]">
            WILDWILD OFFICIAL
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl">
            {pick(lang, goods.name, goods.nameEn, goods.nameZh, goods.nameJa)}
          </h1>
          <p className="mt-3 text-white">
            {pick(lang, goods.desc, goods.descEn, goods.descZh, goods.descJa)}
          </p>
        </header>

        <Slideshow slides={goods.photos} lang={lang} />
        </main>
      </div>
    </>
  );
}
