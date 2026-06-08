export interface GoodsPhoto {
  src: string;
  caption: string;
  captionEn: string;
  captionZh: string;
  captionJa: string;
}

export interface Goods {
  slug: string;
  name: string;
  nameEn: string;
  nameZh: string;
  nameJa: string;
  desc: string;
  descEn: string;
  descZh: string;
  descJa: string;
  photos: [GoodsPhoto, GoodsPhoto];
}

// slug 규칙: 영문 소문자/하이픈만 사용. "error" 는 사용 금지.
export const goodsList: Goods[] = [
  makeMember("siwoo", "시우", "Siwoo"),
  makeMember("jinwoo", "진우", "Jinwoo"),
  makeMember("donghee", "동희", "Donghee"),
  makeMember("njinwook", "진욱", "NJinwook"),
  makeMember("dokyung", "도경", "Dokyung"),
  makeMember("seunggun", "승건", "Seunggun"),
  makeMember("yohan", "요한", "Yohan"),
  makeMember("yunje", "윤제", "Yunje"),
  makeMember("heejung", "희중", "Heejung"),
  makeMember("taeseong", "태성", "Taeseong"),
  makeMember("huiyeob", "희엽", "Huiyeob"),
  makeMember("jay", "재이", "Jay"),
  makeMember("hyukjin", "혁진", "Hyukjin"),
  makeMember("hansaem", "한샘", "Hansaem"),
  makeMember("hjinwook", "진욱", "HJinwook"),
  makeMember("youngjoon", "영준", "Youngjoon"),
  makeMember("chunil", "천일", "Chunil"),
];

function makeMember(slug: string, name: string, nameEn: string): Goods {
  return {
    slug,
    name,
    nameEn,
    nameZh: nameEn,
    nameJa: nameEn,
    desc: "와일드와일드 공연장 한정 굿즈.",
    descEn: "WildWild venue-exclusive goods.",
    descZh: "WildWild 现场限定周边。",
    descJa: "WildWild 会場限定グッズ。",
    photos: [
      {
        src: `/images/${slug}-1.webp`,
        caption: `${name} · 첫 번째 컷`,
        captionEn: `${nameEn} · First Cut`,
        captionZh: `${nameEn} · 第一张`,
        captionJa: `${nameEn} · 1枚目`,
      },
      {
        src: `/images/${slug}-2.webp`,
        caption: `${name} · 두 번째 컷`,
        captionEn: `${nameEn} · Second Cut`,
        captionZh: `${nameEn} · 第二张`,
        captionJa: `${nameEn} · 2枚目`,
      },
    ],
  };
}

export function getGoods(slug: string): Goods | undefined {
  return goodsList.find((g) => g.slug === slug);
}
