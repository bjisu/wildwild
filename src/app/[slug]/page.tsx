import { notFound } from "next/navigation";
import { goodsList, getGoods } from "@/lib/goods";
import { GoodsDetail } from "@/components/goods-detail";

// 정적 export 시 미리 생성할 멤버 페이지 목록 (예: /siwoo, /jiwon ...)
export function generateStaticParams() {
  return goodsList.map((g) => ({ slug: g.slug }));
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goods = getGoods(slug);

  // 정적 export 환경에서는 빌드 시점에 17개 멤버 슬러그만 페이지가 생성됩니다.
  // 그 외 URL 은 호스팅 단에서 404 처리되어 not-found.tsx 가 /error 로 보냅니다.
  if (!goods) {
    notFound();
  }

  return <GoodsDetail goods={goods} />;
}
