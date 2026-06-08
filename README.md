# 와일드와일드 · NFC 굿즈

NFC 태그를 통해 멤버별 굿즈 콘텐츠를 보여주는 정적 웹사이트.
멤버 17명 = 굿즈 17종이며, 각 멤버는 고유 URL 을 가집니다.

## URL 구조

- **`/{슬러그}`** — 멤버 페이지. 예: `https://wildwild.web.app/siwoo`
- **`/error`** — 오류 안내 화면. `/` 와 없는 주소는 모두 자동으로 여기로 이동

## 동작 방식

- **NFC 태그** → `/{슬러그}` 로 진입 → 로고 스플래시(3초) → 멤버 사진 2장 슬라이드
- **도메인 직접 진입** (`/`) → 자동으로 `/error` 로 이동
- **없는 주소** → 자동으로 `/error` 로 이동

각 멤버 화면은 독립된 화면입니다. 다른 멤버나 홈으로 가는 통로는 없습니다.

## 기술 스택

- Next.js 16 · React 19 · TypeScript (strict)
- Tailwind CSS 4 (oklch 디자인 토큰)
- shadcn/ui 패턴 컴포넌트
- Pretendard Variable
- 모바일 우선 · 다크모드 우선

## Cursor 에서 시작하기

1. Cursor 에서 이 폴더를 엽니다 (`File → Open Folder`).
2. 내장 터미널(`Ctrl + 백틱`) 에서:

   ```bash
   npm install
   npm run dev
   ```

3. 브라우저에서 `http://localhost:3000/member-01` 식으로 접속해 멤버 화면을 확인합니다.

## 멤버 정보 채우기

`src/lib/goods.ts` 의 `makeMember(...)` 17줄을 실제 멤버로 교체합니다.

```ts
// 변경 전
makeMember("member-01", "멤버 01", "Member 01"),

// 변경 후 (예: 멤버 이름이 시우)
makeMember("siwoo", "시우", "Siwoo"),
```

- 첫 번째 인자(slug): NFC 태그에 굽는 URL 의 영문 키.
- 슬러그를 `siwoo` 로 바꾸면 그 멤버 주소는 `https://wildwild.web.app/siwoo`.

### 슬러그 규칙

- 영문 소문자와 하이픈만 사용 (한글, 공백, 대문자 금지)
- `error` 는 오류 페이지와 충돌하므로 사용 금지

## 사진 넣기

1. 멤버별 사진을 `public/images/` 에 둡니다. (예: `siwoo-1.jpg`, `siwoo-2.jpg`)
2. `src/lib/goods.ts` 의 해당 멤버 `photos` 의 `src` 값을 채웁니다.

   ```ts
   photos: [
     { src: "/images/siwoo-1.jpg", ... },
     { src: "/images/siwoo-2.jpg", ... },
   ]
   ```

`src` 가 비어 있으면 자리표시자(placeholder)가 표시됩니다.

## 스플래시 로고

- 위치: `src/components/splash.tsx`
- 기본 이미지 경로: `/public/images/logo_red.png` (이 파일을 직접 넣어주세요)
- 시간: 3초 (`<Splash duration={4000} ... />` 로 조절 가능)
- 크기: `w-64` 클래스를 조정해 변경 가능

## 빌드 / 배포

```bash
npm run build   # 정적 export → out/ 폴더 생성
```

`out/` 폴더를 Firebase Hosting · Cloudflare Pages 같은 정적 호스팅에 업로드합니다.
NFC 태그에는 각각 `https://도메인/{슬러그}` 를 굽습니다.

## 파일 구조

```
src/
├── app/
│   ├── globals.css           # Pretendard, oklch 토큰, 한글 타이포, 스플래시 애니메이션
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # / → /error 로 자동 이동
│   ├── not-found.tsx         # 없는 URL → /error 로 자동 이동
│   ├── error/page.tsx        # /error — 흰 화면 안내
│   └── [slug]/page.tsx       # 멤버별 페이지 (슬러그 17개를 동시에 처리)
├── components/
│   ├── splash.tsx            # 로고 스플래시 (3초)
│   ├── slideshow.tsx         # 사진 슬라이드
│   ├── goods-detail.tsx      # 멤버 화면 본체
│   └── ui/button.tsx         # 버튼
└── lib/
    ├── goods.ts              # 멤버 17명 데이터 (여기 한 곳만 채우면 됨)
    └── utils.ts              # cn 유틸
```
