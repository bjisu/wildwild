import { notFound } from "next/navigation";
import { goodsList, getGoods } from "@/lib/goods";
import { GoodsDetail } from "@/components/goods-detail";

export function generateStaticParams() {
  return goodsList.map((g) => ({ slug: g.slug }));
}

export default async function GoodsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goods = getGoods(slug);

  if (!goods) {
    notFound();
  }

  return <GoodsDetail goods={goods} />;
}
