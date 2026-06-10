"use client";

import * as React from "react";
import { Splash } from "@/components/splash";
import { Slideshow } from "@/components/slideshow";
import type { Goods } from "@/lib/goods";

export function GoodsDetail({ goods }: { goods: Goods }) {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <div className="page-background min-h-dvh">
        <main className="mx-auto max-w-md px-5 pb-16 pt-6 text-[var(--color-fg)]">
          <div className="mb-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo_red.webp" alt="WildWild" className="h-15 w-auto" />
          </div>

          <header className="mb-8 text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)]">
              WILD WILD BOILER ROOM BEHIND PHOTO
            </span>
            <h1 className="mt-2 text-5xl uppercase">
              {goods.name}
            </h1>
          </header>

          <Slideshow slides={goods.photos} />
        </main>
      </div>
    </>
  );
}
