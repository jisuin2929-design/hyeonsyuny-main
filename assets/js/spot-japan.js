// ============================================================
// 🇯🇵 OVERSEAS DESTINATION: JAPAN (일본)
// 니세코(오타루·삿포로), 오사카(USJ·고베), 도쿄
// ============================================================

// 1. 니세코 (오타루·삿포로)
OVERSEAS_SPOTS.push({
  id: "niseko",
  nameKo: "일본 니세코 (오타루·삿포로)",
  nameEn: "Niseko, Japan (Otaru · Sapporo)",
  badge: "2024.04",
  milestone: "설국 홋카이도 파우더 스노우보드",
  flag: "🇯🇵",
  coords: [141.0, 43.0],
  callout: { dx: 14, dy: -6, textAnchor: "start" },
  cities: ["니세코", "오타루", "삿포로"],
  spots: ["그랜드 히라후 스키장", "미드타운 니세코", "요테이산 설경", "굿찬역과 박현수 셰프", "오타루 카이센동", "귀여운 오르골들", "삿포로 돈까스"],
  desc: "우리 둘의 첫 원정 파우더 라이딩.새하얀 설경이 남아있던 니세코의 파우더부터 카이센동이 환상적인 오타루 운하, 돈까스가 맛있는 삿포로 시내까지 홋카이도의 봄과 겨울 매력을 모두 만끽한 여정.",
  letter: "“4월에도 남아있던 니세코의 파우더를 가르던 기억, 그치만 한겨울에 또 가보고 싶은 아쉬움. 다음엔 눈내리는 하늘을 보며 뜨끈한 온천을 하고오자요”",
  subAlbums: [
    {
      id: "niseko",
      name: "니세코",
      tag: "🏂 니세코",
      desc: "그랜드 히라후 & 요테이산 설경 & 파우더 라이딩",
      cover: "images/여행지/일본_니세코_오타루_삿포로/IMG_4351.JPEG"
    },
    {
      id: "otaru",
      name: "오타루",
      tag: "🕯️ 오타루",
      desc: "오타루 오르골당 & 수산시장 카이센동",
      cover: "images/여행지/일본_니세코_오타루_삿포로/IMG_9053.JPEG"
    },
    {
      id: "sapporo",
      name: "삿포로",
      tag: "🍜 삿포로",
      desc: "히레카츠 오도리 공원 & 삿포로 미식 탐방",
      cover: "images/여행지/일본_니세코_오타루_삿포로/IMG_9361.JPEG"
    }
  ],
  photos: (function () {
    var NISEKO_BASE = "images/여행지/일본_니세코_오타루_삿포로/";
    var raw = createMediaItems([
      {
        category: "niseko",
        files: [
          "IMG_8368.JPEG", "IMG_8448.JPEG", "IMG_8470.JPEG", "IMG_8483.JPEG",
          "IMG_8526.JPEG", "IMG_8532.JPEG", "IMG_8537.JPEG", "IMG_8542.JPEG",
          "IMG_8544.JPEG", "IMG_8546.JPEG", "IMG_8569.JPG", "IMG_8597.JPEG",
          "IMG_8606.JPEG", "IMG_8620.JPEG", "IMG_8626.JPEG", "IMG_8678.JPEG",
          "IMG_8685.JPEG", "IMG_4140.MP4", "IMG_8696.JPEG", "IMG_4238.JPEG",
          "IMG_8727.JPEG", "IMG_8731.JPEG", "IMG_8744.JPEG", "IMG_4284.JPEG",
          "IMG_8760.JPG", "IMG_8765.JPEG", "IMG_8773.JPEG", "IMG_8785.JPEG",
          "IMG_8790.JPEG", "IMG_8814.JPEG", "IMG_8837.JPEG", "IMG_4328.JPEG",
          "IMG_4351.JPEG", "IMG_8974.JPG", "IMG_8999.JPEG", "IMG_9002.JPEG"
        ]
      },
      {
        category: "otaru",
        files: [
          "IMG_9020.JPEG", "IMG_9053.JPEG", "IMG_4388.JPEG", "IMG_4402.JPEG",
          "IMG_4413.JPEG", "IMG_9126.JPEG", "IMG_9135.JPEG", "IMG_4434.JPEG",
          "IMG_9138.JPEG", "IMG_9150.JPEG", "IMG_9151.JPEG", "IMG_9162.JPEG",
          "IMG_9173.JPEG", "IMG_9179.JPEG", "IMG_4515.JPEG", "IMG_9217.JPEG",
          "IMG_4557.JPG"
        ]
      },
      {
        category: "sapporo",
        files: [
          "IMG_9237.JPEG", "IMG_9260.JPEG", "IMG_9275.JPEG", "IMG_9284.JPEG",
          "IMG_9286.JPEG", "IMG_9292.JPEG", "IMG_9303.JPEG", "IMG_9342.JPEG",
          "IMG_9361.JPEG", "IMG_4667.JPEG", "IMG_4717.JPEG", "IMG_9422.JPEG",
          "IMG_4782.JPEG", "IMG_4918.JPEG", "IMG_9508.JPEG"
        ]
      }
    ]);

    var customCaptions = {};
    var nCount = 0, oCount = 0, sCount = 0;
    return raw.map(function (item, idx) {
      var catIdx = 0;
      var cap = "";
      var name = item.name;

      if (customCaptions[name]) {
        cap = customCaptions[name];
      } else if (item.category === "niseko") {
        catIdx = ++nCount;
        if (/8368|8448|8470|8483/.test(name)) cap = "홋카이도 설국을 향한 출발 & 치토세 도착";
        else if (/8526|8532|8537|8542|8544|8546/.test(name)) cap = "미드타운 니세코 체크인 & 첫 편의점";
        else if (/8569|8597|8606|8620|8626|8678|8685/.test(name)) cap = "니세코 그랜드 히라후 파우더 활주";
        else if (item.type === "video" || /4140/.test(name)) cap = "니세코 설원 파우더 스노 질주 영상";
        else if (/8696|4238|8727|8731|8744|4284|8760|8765|8773|8785|8790/.test(name)) cap = "요테이산 설경 파노라마와 정상 라이딩";
        else if (/8814|8837/.test(name)) cap = "니세코 눈 덮인 거리와 따끈한 저녁";
        else if (/4328|4351|8974|8999|9002/.test(name)) cap = "니세코 설산 카페 & 아쉬운 작별";
        else cap = "니세코 파우더 설원 No." + catIdx;
      } else if (item.category === "otaru") {
        catIdx = ++oCount;
        if (/9020|9053/.test(name)) cap = "낭만의 항구 도시 오타루 입성";
        else if (/4388|4402|4413/.test(name)) cap = "오타루 사카이마치 유리공방 & 오르골당";
        else if (/9126|9135|4434|9138|9150|9151|9162|9173|9179/.test(name)) cap = "오타루 운하의 황혼과 레트로 가스등 불빛";
        else if (/4515|9217|4557/.test(name)) cap = "오타루 낭만 디너 & 르타오 디저트 타임";
        else if (item.type === "video") cap = "오타루 운하 감성 영상";
        else cap = "오타루 운하와 감성 거리 No." + catIdx;
      } else {
        catIdx = ++sCount;
        if (/9237|9260|9275/.test(name)) cap = "삿포로 도심 입성 & 스스키노 거리";
        else if (/9284|9286|9292|9303|9342|9361|4667/.test(name)) cap = "오도리 공원 & 삿포로 번화가 골목 탐방";
        else if (/4717|9422|4782|4918/.test(name)) cap = "삿포로 시내 미식 투어";
        else if (/9508/.test(name)) cap = "신치토세 공항 귀국길 소중한 추억";
        else if (item.type === "video") cap = "삿포로 도심 영상";
        else cap = "삿포로 미식과 도심 산책 No." + catIdx;
      }

      return {
        type: item.type,
        url: NISEKO_BASE + item.name,
        caption: cap,
        category: item.category,
        name: item.name
      };
    });
  })()
});

// 2. 오사카 (USJ·고베)
OVERSEAS_SPOTS.push({
  id: "osaka",
  nameKo: "일본 오사카(USJ·고베)",
  nameEn: "Osaka & Kobe, Japan",
  badge: "2025.03",
  milestone: "봄 미식 & 문화 탐방",
  flag: "🇯🇵",
  coords: [135.5023, 34.6937],
  callout: { dx: 14, dy: 16, textAnchor: "start" },
  cities: ["오사카", "도톤보리", "USJ", "고베"],
  spots: ["카이센동 맛집", "유니버셜 스튜디오 USJ", "슈퍼 닌텐도 월드", "고베 하버랜드"],
  desc: "음식으로 시작하여 음식으로 끝난 여행. 규카츠부터 카이센동까지, 해리포터 마법 세계와 마리오 카트, 고베 하버랜드의 지브리샵까지 누빈 여정.",
  letter: "“규카츠도 카이센동도 장어덮밥도 토마토라멘도 마지막 스시오마카세도 전부다 최고의 맛도리, 유니버셜가서 온갖 놀이기구는 다 타고 어렸을 때보다 더 잘 즐겼을 하루! 가보고 싶었던 고베 하버랜드에 데려가준 현수에게도 감사.”",
  photos: (function () {
    var OSAKA_BASE = "images/여행지/일본_오사카/";
    var raw = createMediaItems([
      "IMG_8359.JPEG", "IMG_8385.JPEG", "IMG_8445.JPEG", "IMG_8550.JPEG",
      "IMG_2608.JPEG", "IMG_8659.JPEG", "IMG_2622.JPEG", "IMG_8826.JPEG",
      "IMG_8899.JPEG", "IMG_2654.JPEG", "IMG_2684.JPEG", "IMG_8991.JPEG",
      "IMG_9064.JPEG", "IMG_2760.JPEG", "IMG_9242.JPEG", "IMG_9296.JPEG",
      "IMG_9348.JPEG", "IMG_9358.JPEG", "IMG_9405.JPEG", "IMG_9428.JPEG",
      "IMG_9437.JPEG", "IMG_2835.JPEG", "IMG_9517.JPEG", "IMG_9552.JPEG",
      "IMG_9570.JPEG", "IMG_9665.JPEG"
    ]);

    var customCaptions = {
      "IMG_8359.JPEG": "간사이 국제공항 도착 & 설레는 오사카 여행의 시작",
      "IMG_8385.JPEG": "오사카 우메다 도심 입성 & 활기찬 거리",
      "IMG_8445.JPEG": "기타하마 강변 골목 산책과 저녁 풍경",
      "IMG_8550.JPEG": "도톤보리 글리코상 네온사인과 활기찬 밤거리",
      "IMG_2608.JPEG": "유니버셜 스튜디오 재팬 입성!",
      "IMG_8659.JPEG": "호그와트 성과 호수 풍경",
      "IMG_2622.JPEG": "USJ 버터맥주와 마법 지팡이의 추억",
      "IMG_8826.JPEG": "슈퍼 닌텐도 월드 마리오 카트 레이싱",
      "IMG_8899.JPEG": "피치 공주 성과 알록달록 버섯 왕국",
      "IMG_2654.JPEG": "USJ 테마파크 퍼레이드와 신나는 어트랙션",
      "IMG_2684.JPEG": "닌텐도 월드 키노피오 카페와 마법 간식",
      "IMG_8991.JPEG": "동화 속 세상 같은 USJ 곳곳의 풍경",
      "IMG_9064.JPEG": "노을 물드는 USJ 테마파크 전경",
      "IMG_2760.JPEG": "화려한 야간 조명이 켜진 USJ의 밤",
      "IMG_9242.JPEG": "밤의 호그와트 성과 환상적인 라이트업",
      "IMG_9296.JPEG": "우메다 복귀 & 따뜻한 오사카 미식 야식",
      "IMG_9348.JPEG": "상쾌한 아침의 오사카 도심 산책",
      "IMG_9358.JPEG": "고즈넉한 오사카 골목길의 봄 아침",
      "IMG_9405.JPEG": "고베 하버랜드로 이동 & 이국적인 항구 풍경",
      "IMG_9428.JPEG": "고베 포트타워와 붉은 석양빛 바다",
      "IMG_9437.JPEG": "고베 메리켄 파크의 시원한 바닷바람",
      "IMG_2835.JPEG": "고베 하버랜드 야경과 모자이크 대관람차",
      "IMG_9517.JPEG": "보랏빛으로 물드는 고베 항구의 황혼",
      "IMG_9552.JPEG": "황홀한 고베 야경과 로맨틱한 항만 산책",
      "IMG_9570.JPEG": "바다 위에 반짝이는 고베의 불빛들",
      "IMG_9665.JPEG": "소중하고 행복했던 봄날의 오사카 여행 마무리"
    };

    var count = 0;
    return raw.map(function (item) {
      count++;
      var cap = customCaptions[item.name] || ("오사카 & 고베 보도 사진 No." + count);
      return {
        type: item.type,
        url: OSAKA_BASE + item.name,
        caption: cap,
        name: item.name
      };
    });
  })()
});

// 3. 도쿄
OVERSEAS_SPOTS.push({
  id: "tokyo",
  nameKo: "일본 도쿄",
  nameEn: "Tokyo, Japan",
  badge: "2025.08",
  milestone: "여름 메가시티 탐방",
  flag: "🇯🇵",
  coords: [139.6917, 35.6895],
  callout: { dx: 14, dy: -8, textAnchor: "start" },
  cities: ["도쿄"],
  spots: ["시부야 스크램블", "도쿄타워 야경", "신주쿠", "긴자"],
  desc: "수인이의 도쿄여행을 되돌아보는 시부야, 다채로운 도심 문화를 탐방했던 여행.",
  letter: "“역시나 맛있는 음식과 끝없이 교차하는 시부야 스크램블, 하지만 우리에겐 너무 더웠던 도쿄...”",
  photos: (function () {
    var TOKYO_BASE = "images/여행지/일본_도쿄/";
    var raw = createMediaItems(["IMG_5660.jpeg", "IMG_5680.jpeg"]);

    var customCaptions = {
      "IMG_5660.jpeg": "도쿄 전통 장어덮밥 & 갓 구운 계란말이",
      "IMG_5680.jpeg": "시부야 스크램블 교차로 & 스타벅스 츠타야"
    };

    var count = 0;
    return raw.map(function (item) {
      count++;
      var cap = customCaptions[item.name] || ("도쿄 도심 탐방 No." + count);
      return {
        type: item.type,
        url: TOKYO_BASE + item.name,
        caption: cap,
        name: item.name
      };
    });
  })()
});
