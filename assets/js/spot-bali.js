// ============================================================
// 🇮🇩 OVERSEAS DESTINATION: INDONESIA BALI (발리)
// 우붓, 누사페니다, 스미냑 열대 낭만 & 비경 휴양
// ============================================================
OVERSEAS_SPOTS.push({
  id: "bali",
  nameKo: "인도네시아 발리",
  nameEn: "Bali (Ubud · Nusa Penida · Seminyak)",
  badge: "2026.07",
  milestone: "열대 낭만 & 비경 휴양",
  flag: "🇮🇩",
  coords: [115.35, -8.62],
  callout: { dx: 14, dy: 2, textAnchor: "start" },
  cities: ["우붓", "누사페니다", "스미냑"],
  spots: ["우붓 계단식 논과 정글", "누사페니다 켈링킹비치 절벽", "스미냑 선셋 비치"],
  desc: "정글 감성의 우붓, 만타가 많다 누사페니다 섬, 무제한 서핑과 황홀한 노을의 스미냑까지! 신들의 섬 발리 일주.",
  letter: "\"원숭이가 잔뜩 많은 우붓의 숲, 켈링킹비치의 웅장한 절벽, 누사페니다에서 만난 만타가오리들, 스미냑 비치클럽에 누워 바라본 붉은 노을.\"",
  subAlbums: [
    {
      id: "ubud",
      name: "우붓",
      tag: "🌿 우붓",
      desc: "우붓 정글에서의 싱그러운 휴양",
      cover: "images/여행지/인도네시아_발리/IMG_7450.JPEG"
    },
    {
      id: "nusa_penida",
      name: "누사페니다",
      tag: "🦕 누사페니다",
      desc: "누사페니다 켈링킹비치 절벽 & 만타 투어",
      cover: "images/여행지/인도네시아_발리/DJI_20260720130535_0009_D.jpeg"
    },
    {
      id: "seminyak",
      name: "스미냑",
      tag: "🌅 스미냑",
      desc: "스미냑 붉은 선셋 비치 & 비치클럽 휴양",
      cover: "images/여행지/인도네시아_발리/IMG_2614.JPEG"
    }
  ],
  photos: (function () {
    var BALI_BASE = "images/여행지/인도네시아_발리/";
    var raw = createMediaItems([
      {
        category: "ubud",
        files: [
          "SN209992.jpeg", "SN200063.jpeg", "IMG_0988.jpeg", "IMG_7761.JPEG",
          "IMG_7828.JPEG", "IMG_7902.JPEG", "IMG_7324.JPEG", "IMG_1413.JPEG",
          "IMG_1451.JPEG", "IMG_1495.JPEG", "IMG_7374.JPEG", "IMG_1638.JPEG",
          "IMG_1732.JPEG", "IMG_7434.JPEG", "IMG_7450.JPEG", "KNK06346.jpeg",
          "GX017995.MP4", "IMG_7517.JPEG", "IMG_1941.MP4", "IMG_1978.JPEG",
          "IMG_7739.JPEG", "IMG_7766.JPEG", "IMG_2020.JPEG", "IMG_2028.JPEG",
          "IMG_2039.JPEG", "IMG_2054.JPEG", "IMG_2147.JPEG"
        ]
      },
      {
        category: "nusa_penida",
        files: [
          "IMG_2180.JPEG", "DJI_20260720130535_0009_D.jpeg", "DJI_20260720131128_0022_D.mp4",
          "IMG_2203.JPEG", "IMG_2273.JPEG", "DJI_20260720141141_0030_D.mp4",
          "DJI_20260720141546_0032_D.mp4", "DJI_20260720141713_0033_D.mp4",
          "DJI_20260720151049_0058_D.jpeg", "IMG_7798.JPEG", "IMG_7806.JPEG",
          "IMG_7826.JPEG", "IMG_7829.JPEG", "IMG_7846.JPEG", "IMG_7855.JPEG",
          "IMG_8027.MP4", "IMG_8082.JPEG", "IMG_8092.JPEG", "IMG_8141.JPEG",
          "IMG_8216.JPEG", "IMG_8255.JPEG", "IMG_2345.JPEG", "IMG_2360.JPEG",
          "IMG_8285.JPEG", "IMG_8286.JPEG", "IMG_2378.JPEG", "IMG_2393.JPEG",
          "IMG_2421.JPEG", "IMG_2439.JPEG", "IMG_2444.JPEG", "IMG_2496.JPEG",
          "IMG_8329.JPEG", "IMG_2518.JPEG", "IMG_8391.JPEG", "IMG_2538.JPEG",
          "IMG_2545.JPEG"
        ]
      },
      {
        category: "seminyak",
        files: [
          "IMG_2550.JPEG", "IMG_2579.JPEG", "IMG_2589.JPEG", "IMG_2614.JPEG",
          "IMG_2620.JPEG", "IMG_2640.JPEG", "IMG_2652.JPEG", "IMG_2767.JPEG",
          "IMG_2827.JPEG", "IMG_8546.JPEG", "IMG_8552.JPEG", "IMG_3015.JPEG",
          "IMG_3016.JPEG", "IMG_3038.JPEG", "IMG_3043.JPEG", "IMG_3071.JPEG",
          "IMG_3088.JPEG", "IMG_3125.JPEG", "IMG_3143.MP4", "IMG_3151.JPEG",
          "IMG_8586.JPEG", "IMG_3175.JPEG", "IMG_3180.JPEG", "IMG_3194.JPEG",
          "IMG_3221.MP4", "IMG_3248.JPEG", "IMG_3263.JPEG", "IMG_3275.MP4",
          "IMG_3283.JPEG", "IMG_3312.JPEG", "IMG_3324.JPEG", "IMG_3335.JPEG",
          "IMG_3346.MP4", "IMG_3358.JPEG", "IMG_3375.JPEG", "IMG_8652.JPEG",
          "IMG_3418.JPEG", "IMG_3438.JPEG", "IMG_3466.JPEG", "IMG_8662.JPEG",
          "IMG_3491.JPEG", "IMG_3541.JPEG", "IMG_8703.JPEG", "IMG_3570.JPEG",
          "IMG_3581.JPEG", "IMG_8744.JPEG", "IMG_3597.JPEG", "IMG_3608.JPEG",
          "IMG_3621.JPEG", "IMG_3624.JPEG", "IMG_3627.JPEG", "IMG_3641.JPEG",
          "IMG_3651.JPEG"
        ]
      }
    ]);

    var uCount = 0, nCount = 0, sCount = 0;
    return raw.map(function (item) {
      var catIdx = 0;
      var cap = "";
      var name = item.name;

      if (item.category === "ubud") {
        catIdx = ++uCount;
        if (/SN209992|SN200063|0988/.test(name)) cap = "우붓 정글 리조트 입성 & 풀빌라 전경";
        else if (/7761|7828|7902|7324/.test(name)) cap = "우붓 몽키포레스트 원숭이들과의 만남";
        else if (/1413|1451|1495|7374/.test(name)) cap = "뜨갈랄랑 계단식 논 테라스 뷰";
        else if (/1638|1732|7434|7450|06346/.test(name)) cap = "우붓 정글 숲속 힐링 & 시원한 수영";
        else if (/7517|1978|7739|7766|2020|2028|2039|2054|2147/.test(name)) cap = "우붓 로컬 카페 & 감성 가득한 저녁 산책";
        else if (item.type === "video") cap = "우붓 정글 & 계곡 영상 기록";
        else cap = "싱그러운 우붓 열대 정글에서의 여유로운 힐링";
      } else if (item.category === "nusa_penida") {
        catIdx = ++nCount;
        if (/2180|2203/.test(name)) cap = "누사페니다 섬 도착 & 에메랄드 항구";
        else if (/DJI.*130535|2273/.test(name)) cap = "누사페니다 켈링킹비치 절벽";
        else if (/DJI.*151049|7806|7826|7829|7846|7855/.test(name)) cap = "브로큰 비치 & 엔젤스 빌라봉 비경";
        else if (/8082|8092|8141|8216|8255|2345|2360/.test(name)) cap = "누사페니다 프라이빗 빌라 휴식";
        else if (/8285|8286|2378|2393/.test(name)) cap = "누사페니다 달빛 아래 저녁 식사";
        else if (/2421|2439|2444/.test(name)) cap = "누사페니다 아침 오션뷰";
        else if (/2496|8329|2518|8391|2538|2545/.test(name)) cap = "누사페니다 크리스탈 부이 해변";
        else if (item.type === "video") cap = "누사페니다 켈링킹비치 드론 영상";
        else cap = "누사페니다 에메랄드빛 해안과 웅장한 비경";
      } else {
        catIdx = ++sCount;
        if (/2550|2579|2589|2614|2620|2640|2652|2767/.test(name)) cap = "스미냑 해변의 황홀한 붉은 선셋";
        else if (/2827|8546|8552|3015/.test(name)) cap = "스미냑 비치클럽 나이트 바이브";
        else if (/3016|3038|3043/.test(name)) cap = "스미냑 풀빌라에서의 여유로운 아침";
        else if (/3071|3088|3125|3151|8586|3175|3180|3194/.test(name)) cap = "스미냑 카페 & 트렌디 쇼핑 거리";
        else if (/3248|3263|3283|3312|3324/.test(name)) cap = "스미냑 로맨틱 디너 & 베이커리";
        else if (/3335|3358|3375|8652|3418|3438|3466/.test(name)) cap = "스미냑 남부 절벽 카페 투어";
        else if (/8662|3491|3541|8703|3570|3581|8744|3597|3608/.test(name)) cap = "짐바란 해변 선셋 & 해산물 씨푸드 만찬";
        else if (/3621|3624|3627|3641/.test(name)) cap = "발리 마지막 밤의 축배";
        else if (/3651/.test(name)) cap = "인천공항 귀국길 소중한 추억";
        else if (item.type === "video") cap = "스미냑 선셋 & 비치클럽 영상";
        else cap = "스미냑 해변의 황홀한 노을과 낭만적인 휴양";
      }
      return {
        type: item.type,
        url: BALI_BASE + item.name,
        caption: cap,
        category: item.category,
        name: item.name
      };
    });
  })()
});
