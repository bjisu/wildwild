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
  makeMember("siwoo", "SIWOO"),
  makeMember("jinwoo", "JINWOO"),
  makeMember("donghee", "DONGHEE"),
  makeMember("njinwook", "JINWOOK"),
  makeMember("dokyung", "DOKYUNG"),
  makeMember("seunggun", "SEUNGGUN"),
  makeMember("yohan", "YOHAN"),
  makeMember("yunje", "YUNJE"),
  makeMember("heejung", "HEEJUNG"),
  makeMember("taeseong", "TAESEONG"),
  makeMember("huiyeob", "HUIYEOB"),
  makeMember("jay", "JAY"),
  makeMember("hyukjin", "HYUKJIN"),
  makeMember("hansaem", "SAEM"),
  makeMember("hjinwook", "JINWOOK"),
  makeMember("youngjoon", "YOUNGJOON"),
  makeMember("chunil", "CHUNIL"),
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
