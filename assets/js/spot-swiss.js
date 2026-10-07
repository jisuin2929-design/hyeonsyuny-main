// ============================================================
// 🇨🇭 OVERSEAS DESTINATION: SWITZERLAND (스위스)
// 체르마트, 그린델발트, 융프라우, 인터라켄, 루체른, 취리히 5대 도시 대장정
// ============================================================
OVERSEAS_SPOTS.push({
  id: "swiss",
  nameKo: "스위스 (5대 도시 대장정)",
  nameEn: "Switzerland Grand Tour",
  badge: "2025.01",
  milestone: "겨울 알프스 만년설 일주",
  flag: "🇨🇭",
  coords: [8.15, 46.7],
  callout: { dx: 14, dy: -4, textAnchor: "start" },
  cities: ["체르마트", "그린델발트", "융프라우", "인터라켄", "루체른", "취리히"],
  spots: ["마테호른(체르마트)", "융프라우요흐", "피르스트", "클라이데샤이넥", "루체른 카펠교", "취리히 마테호른 잔"],
  desc: "체르마트의 황금빛 마테호른부터 아이거 북벽 아래 그린델발트, 유럽의 지붕 융프라우, 낭만의 루체른, 번화한 취리히까지 이어진 꿈같은 스위스 겨울 대장정.",
  letter: "“운 좋게 본 황금호른과 눈덮힌 체르마트 마을 ... 그린델발트에서의 보딩, 융프라우의 숨막히는 절경까지... 태교여행으로 또 와야 하는 잊을 수 없는 스위스 대장정!.”",
  subAlbums: [
    {
      id: "zermatt",
      name: "체르마트",
      tag: "🏔️ 체르마트",
      desc: "마테호른 설산 & 황금 호른의 웅장한 감동",
      cover: "images/여행지/스위스/체르마트/IMG_2392.JPEG"
    },
    {
      id: "jungfrau",
      name: "융프라우",
      tag: "❄️ 융프라우",
      desc: "만년설의 지붕 융프라우요흐 & 피르스트 액티비티",
      cover: "images/여행지/스위스/융프라우/IMG_1223.JPEG"
    },
    {
      id: "grindelwald",
      name: "그린델발트",
      tag: "🏡 그린델발트",
      desc: "아이거 북벽을 보며 보드타기",
      cover: "images/여행지/스위스/그린델발트/IMG_4037.JPEG"
    },
    {
      id: "interlaken",
      name: "인터라켄",
      tag: "🏞️ 인터라켄",
      desc: "하늘에서 바라보는 예쁜 호수와 인터라켄",
      cover: "images/여행지/스위스/인터라켄/IMG_3914.jpeg"
    },
    {
      id: "lucerne",
      name: "루체른",
      tag: "🌉 루체른",
      desc: "카펠교와 명품의 거리",
      cover: "images/여행지/스위스/루체른/IMG_4229.jpeg"
    },
    {
      id: "zurich",
      name: "취리히",
      tag: "🏛️ 취리히",
      desc: "취리히 호수와 품격 있는 유럽 구시가지 산책",
      cover: "images/여행지/스위스/취리히/IMG_5130.jpg"
    }
  ],
  photos: (function () {
    var SWISS_BASE = "images/여행지/스위스/";
    var raw = createMediaItems([
      {
        folder: "그린델발트",
        category: "grindelwald",
        files: [
          "IMG_2981.MP4", "IMG_3037.MP4", "IMG_2985.JPEG", "IMG_1453.JPEG",
          "IMG_2995.JPEG", "IMG_3002.JPEG", "IMG_3017.JPEG", "IMG_3024.JPEG",
          "IMG_1460.JPEG", "IMG_3045.JPEG", "IMG_3053.JPEG", "IMG_3078.JPEG",
          "IMG_3096.JPEG", "IMG_3153.JPEG", "IMG_1533.JPEG", "IMG_3171.JPEG",
          "IMG_1555.JPG", "IMG_3193.JPEG", "IMG_3212.JPEG", "IMG_3215.JPEG",
          "IMG_3329.JPEG", "IMG_1579.JPEG", "IMG_3357.JPEG", "IMG_3411.JPEG",
          "IMG_3446.JPEG", "IMG_3476.JPEG", "IMG_1636.JPEG", "IMG_1679.JPEG",
          "IMG_3540.JPEG", "IMG_3603.JPEG", "IMG_1703.JPEG", "IMG_4037.JPG",
          "IMG_3689.JPEG", "IMG_3812.JPEG", "IMG_2464.JPG"
        ]
      },
      {
        folder: "융프라우",
        category: "jungfrau",
        files: [
          "IMG_0900.MP4", "IMG_0940.MP4", "IMG_2846.MP4", "IMG_0850.JPEG",
          "IMG_0863.JPEG", "IMG_0873.JPEG", "IMG_0879.JPEG", "IMG_0880.JPEG",
          "IMG_0894.JPEG", "IMG_0914.JPEG", "IMG_0934.JPEG", "IMG_0999.JPEG",
          "IMG_1050.JPEG", "IMG_1057.JPEG", "IMG_1169.JPEG", "IMG_1223.JPEG",
          "IMG_1267.JPEG", "IMG_1376.JPEG", "IMG_1389.JPEG", "IMG_1432.JPEG",
          "IMG_1435.JPEG", "IMG_2939.JPEG", "IMG_2949.JPEG", "IMG_2954.JPEG",
          "IMG_2958.JPEG", "IMG_2970.JPEG", "IMG_2998.JPEG", "IMG_3017.JPEG"
        ]
      },
      {
        folder: "체르마트",
        category: "zermatt",
        files: [
          "IMG_1858.JPEG", "IMG_1861.JPEG", "IMG_1864.JPEG", "IMG_1866.JPEG",
          "IMG_1893.JPEG", "IMG_1895.JPEG", "IMG_1898.JPEG", "IMG_1903.JPEG",
          "IMG_1908.JPEG", "IMG_0617.JPEG", "IMG_0642.JPEG", "IMG_0668.JPEG",
          "IMG_0675.JPEG", "IMG_1950.JPEG", "IMG_2006.JPEG", "IMG_2016.JPEG",
          "IMG_2024.JPEG", "IMG_2030.JPEG", "IMG_2049.JPEG", "IMG_2050.JPEG",
          "IMG_0706.JPEG", "IMG_0710.JPEG", "IMG_2073.MP4", "IMG_2152.JPEG",
          "IMG_2188.JPEG", "IMG_7663.JPG", "IMG_2205.JPEG", "IMG_7661.JPG",
          "IMG_2219.JPEG", "IMG_2227.JPEG", "IMG_2231.JPEG", "IMG_2236.JPEG",
          "IMG_2263.JPEG", "IMG_2277.JPEG", "IMG_2318.JPEG", "IMG_2375.JPEG",
          "IMG_2381.JPEG", "IMG_2392.JPEG", "IMG_2426.JPEG", "IMG_2430.JPEG",
          "IMG_2470.JPEG", "IMG_2473.JPEG", "IMG_0742.JPEG", "IMG_0746.JPEG",
          "IMG_7662.JPG", "IMG_0757.JPEG", "IMG_7664.JPG", "IMG_2554.JPEG",
          "IMG_2558.JPEG", "IMG_0767.JPEG", "IMG_2636.JPEG"
        ]
      },
      {
        folder: "인터라켄",
        category: "interlaken",
        files: [
          "GOPR1561.JPG", "GOPR4574.JPG", "GOPR4587.JPG", "IMG_1846.jpeg",
          "IMG_3914.jpeg", "IMG_3919.jpeg", "IMG_3923.jpeg", "IMG_3941.jpeg"
        ]
      },
      {
        folder: "루체른",
        category: "lucerne",
        files: [
          "IMG_1945.jpeg", "IMG_4179.jpg", "IMG_4229.jpeg", "IMG_4302.jpeg",
          "IMG_4429.jpeg", "IMG_4469.jpeg"
        ]
      },
      {
        folder: "취리히",
        category: "zurich",
        files: [
          "IMG_2017.jpeg", "IMG_5130.jpg"
        ]
      }
    ]);

    var customCaptions = {};
    var zCount = 0, gCount = 0, jCount = 0, inCount = 0, lCount = 0, zuCount = 0;
    return raw.map(function (item) {
      var catIdx = 0;
      var cap = "";
      var name = item.name;

      if (customCaptions[name]) {
        cap = customCaptions[name];
      } else if (item.category === "zermatt") {
        catIdx = ++zCount;
        if (/1858|1861|1864|1866|1893|1895|1898|1903|1908/.test(name)) cap = "체르마트 도착 & 아늑한 알프스 마을의 첫날밤";
        else if (/0617|0642|0668|0675|1950/.test(name)) cap = "황금빛으로 불타오르는 새벽 마테호른 (황금 호른)";
        else if (/2006|2016|2024|2030|2049|2050/.test(name)) cap = "고르너그라트 산악열차와 알프스 파노라마";
        else if (/0706|0710|2152|2188|7663|2205|7661|2219|2227|2231|2236|2263|2277|2318|2375|2381|2392|2426|2430|2470|2473/.test(name)) cap = "체르마트 만년설 슬로프 활주 & 빙하 파라다이스";
        else if (/0742|0746|7662|0757|7664/.test(name)) cap = "마테호른을 등 뒤로 한 눈부신 기념 촬영";
        else if (/2554|2558|0767|2636/.test(name)) cap = "체르마트 낭만 디너와 알프스 골목 산책";
        else if (item.type === "video") cap = "체르마트 마테호른 설산 질주 영상";
        else cap = "체르마트 마테호른 비경 No." + catIdx;
      } else if (item.category === "grindelwald") {
        catIdx = ++gCount;
        if (/2985|2995|3002|1453/.test(name)) cap = "그린델발트 도착 & 아늑한 샬레의 밤";
        else if (/3017|3024|3045|3053|1460/.test(name)) cap = "아이거 북벽이 눈앞에 펼쳐지는 샬레의 아침";
        else if (/3078|3096|3153|3171|1533|1555/.test(name)) cap = "피르스트 클리프워크 & 설산 액티비티";
        else if (/3193|3212|3215|3329|3357|3411|3446|3476|3540|1579|1636|1679|1703/.test(name)) cap = "그린델발트 눈꽃 힐링과 클라이네 샤이덱";
        else if (/3603|3689|3812|4037|2464/.test(name)) cap = "그린델발트에서의 따스한 겨울 휴식";
        else if (item.type === "video") cap = "그린델발트 샬레 & 설경 영상";
        else cap = "그린델발트 동화 마을 No." + catIdx;
      } else if (item.category === "jungfrau") {
        catIdx = ++jCount;
        if (/0850|0863|0873|0879|0880/.test(name)) cap = "아이거 익스프레스 케이블카 & 산악열차 등반";
        else if (/0894|0999|1050|1057|1169|1223|1267|1376|1389|1432|1435/.test(name)) cap = "유럽의 지붕 융프라우요흐 스핑크스 전망대 & 얼음궁전";
        else if (/2939|2949|2954|2958|2970|2998/.test(name)) cap = "융프라우 만년설 고원 설경 & 빙하 하산길";
        else if (item.type === "video") cap = "융프라우요흐 만년설 영상 기록";
        else cap = "만년설 융프라우요흐 No." + catIdx;
      } else if (item.category === "interlaken") {
        catIdx = ++inCount;
        if (/GOPR/.test(name)) cap = "인터라켄 상공 패러글라이딩 액티비티";
        else if (/1846|3914|3919/.test(name)) cap = "인터라켄 마을 풍경 & 에메랄드빛 툰·브리엔츠 호수";
        else if (/3923|3941/.test(name)) cap = "인터라켄 알프스 산책로의 맑은 공기";
        else cap = "인터라켄 호수와 알프스 No." + catIdx;
      } else if (item.category === "lucerne") {
        catIdx = ++lCount;
        if (/1945|4179/.test(name)) cap = "루체른 구시가지 골목과 아름다운 호반";
        else if (/4229|4302/.test(name)) cap = "유럽에서 가장 오래된 목조 다리 카펠교";
        else if (/4429|4469/.test(name)) cap = "루체른 호수의 백조들과 낭만적인 오후";
        else cap = "루체른 카펠교와 호반 낭만 No." + catIdx;
      } else {
        catIdx = ++zuCount;
        if (/2017/.test(name)) cap = "취리히 구시가지 리마트 강변 산책";
        else if (/5130/.test(name)) cap = "취리히 시내와 낭만적인 기념품 탐방";
        else cap = "취리히 구시가지와 호반 산책 No." + catIdx;
      }

      var itemUrl = item.url ? item.url : (SWISS_BASE + item.folder + "/" + item.name);
      return {
        type: item.type,
        url: itemUrl,
        caption: cap,
        category: item.category,
        name: item.name
      };
    });
  })()
});
