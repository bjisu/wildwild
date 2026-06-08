// /error — 공식 경로가 아닌 진입을 막는 안내 화면.
export default function ErrorPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-center">
      <p className="text-base font-medium text-[var(--color-fg)]">
        공식 굿즈를 통해서 이용해주세요.
      </p>
    </main>
  );
}
