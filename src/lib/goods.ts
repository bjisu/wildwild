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
  makeMember("siwoo", "시우", "Kim Si Woo"),
  makeMember("jinwoo", "진우", "Kim Jin Woo"),
  makeMember("donghee", "동희", "Kim dong Hee"),
  makeMember("njinwook", "진욱", "Roh Jin Wook"),
  makeMember("dokyung", "도경", "Park Do Kyung"),
  makeMember("seunggun", "승건", "Park Seoung Gun"),
  makeMember("yohan", "요한", "Yang Yo Han"),
  makeMember("yunje", "윤제", "Lee Yun Je"),
  makeMember("heejung", "희중", "Lee Hee Jung"),
  makeMember("taeseong", "태성", "Jang Tae Seong"),
  makeMember("huiyeob", "희엽", "Jeong Hui yeob"),
  makeMember("jay", "재이", "Choi Jay"),
  makeMember("hyukjin", "혁진", "Choi Hyuk Jin"),
  makeMember("hansaem", "한샘", "Saem"),
  makeMember("hjinwook", "진욱", "Han Jin Wook"),
  makeMember("youngjoon", "영준", "Sim Young Joon"),
  makeMember("chunil", "천일", "Kang Chun Il"),
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
