export interface GoodsPhoto {
  src: string;
  caption: string;
}

export interface Goods {
  slug: string;
  name: string;
  photos: [GoodsPhoto, GoodsPhoto];
}

// slug 규칙: 영문 소문자/하이픈만 사용. "error" 는 사용 금지.
export const goodsList: Goods[] = [
  makeMember("siwoo", "시우"),
  makeMember("jinwoo", "진우"),
  makeMember("donghee", "동희"),
  makeMember("njinwook", "진욱"),
  makeMember("dokyung", "도경"),
  makeMember("seunggun", "승건"),
  makeMember("yohan", "요한"),
  makeMember("yunje", "윤제"),
  makeMember("heejung", "희중"),
  makeMember("taeseong", "태성"),
  makeMember("huiyeob", "희엽"),
  makeMember("jay", "재이"),
  makeMember("hyukjin", "혁진"),
  makeMember("hansaem", "한샘"),
  makeMember("hjinwook", "진욱"),
  makeMember("youngjoon", "영준"),
  makeMember("chunil", "천일"),
];

function makeMember(slug: string, name: string): Goods {
  return {
    slug,
    name,
    photos: [
      {
        src: `/images/${slug}-1.webp`,
        caption: `${name} · 첫 번째 컷`,
      },
      {
        src: `/images/${slug}-2.webp`,
        caption: `${name} · 두 번째 컷`,
      },
    ],
  };
}

export function getGoods(slug: string): Goods | undefined {
  return goodsList.find((g) => g.slug === slug);
}
