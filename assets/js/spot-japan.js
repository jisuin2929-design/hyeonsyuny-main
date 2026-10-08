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
          "IMG_3899.JPEG", "IMG_4119.JPEG", "IMG_4123.JPEG", "IMG_4134.JPEG",
          "IMG_4150.JPEG", "IMG_4188.JPEG", "IMG_4210.JPEG", "IMG_4211.JPEG",
          "IMG_4217.JPEG", "IMG_4222.JPEG", "IMG_4243.JPEG", "IMG_4251.JPEG",
          "IMG_4263.JPEG", "IMG_4275.JPEG", "IMG_4319.JPEG", "IMG_4323.JPEG",
          "IMG_4351.JPEG", "IMG_4369.JPEG", "IMG_4370.JPEG", "IMG_4413.JPEG",
          "IMG_4419.JPEG", "IMG_4437.JPEG", "IMG_4442.JPEG", "IMG_4449.JPEG",
          "IMG_4452.JPEG", "IMG_4456.JPEG", "IMG_4461.JPEG", "IMG_4482.JPEG",
          "IMG_4489.JPEG", "IMG_4490.JPEG", "IMG_4507.JPEG", "IMG_4517.JPEG",
          "IMG_4523.JPEG", "IMG_4541.JPEG", "IMG_4542.JPEG", "IMG_4550.JPEG",
          "IMG_4553.JPEG", "IMG_4562.JPEG", "IMG_4589.JPEG", "IMG_4591.JPEG",
          "IMG_4600.JPEG", "IMG_4611.JPEG", "IMG_4614.JPEG", "IMG_4617.JPEG",
          "IMG_4626.JPEG", "IMG_4631.JPEG", "IMG_4640.JPEG", "IMG_4654.JPEG",
          "IMG_4658.JPEG", "IMG_4659.JPEG", "IMG_4664.JPEG", "IMG_4680.JPEG",
          "IMG_4682.JPEG", "IMG_4701.JPEG", "IMG_4708.JPEG", "IMG_4724.JPEG",
          "IMG_4734.JPEG", "IMG_4754.JPEG", "IMG_4759.JPEG", "IMG_4761.JPEG",
          "IMG_4766.JPEG", "IMG_4769.JPEG", "IMG_4770.JPEG", "IMG_4779.JPEG",
          "IMG_4780.JPEG", "IMG_4798.JPEG", "IMG_4800.JPEG", "IMG_4803.JPEG",
          "IMG_4815.JPEG", "IMG_4821.JPEG", "IMG_4833.JPEG", "IMG_4836.JPEG",
          "IMG_4840.JPEG", "IMG_4842.JPEG", "IMG_4849.JPEG", "IMG_4855.JPEG",
          "IMG_4861.JPEG", "IMG_4869.JPEG", "IMG_4874.JPEG", "IMG_4876.JPEG",
          "IMG_4879.JPEG", "IMG_4896.JPEG", "IMG_4901.JPEG", "IMG_4905.JPEG",
          "IMG_4908.JPEG", "IMG_4917.JPEG", "IMG_4920.JPEG", "IMG_4922.JPEG",
          "IMG_4923.JPEG", "IMG_4924.JPEG", "IMG_4925.JPEG", "IMG_4926.JPEG",
          "IMG_4929.JPEG", "IMG_4930.JPEG", "IMG_4933.JPEG", "IMG_4934.JPEG",
          "IMG_4939.JPEG", "IMG_4941.JPEG", "IMG_4943.JPEG", "IMG_4944.JPEG",
          "IMG_4948.JPEG", "IMG_4949.JPEG", "IMG_4951.JPEG", "IMG_4953.JPEG",
          "IMG_4962.JPEG", "IMG_4963.JPEG", "IMG_4964.JPEG", "IMG_4965.JPEG",
          "IMG_4968.JPEG", "IMG_4970.JPEG", "IMG_4971.JPEG", "IMG_4972.JPEG",
          "IMG_4973.JPEG", "IMG_4974.JPEG", "IMG_4978.JPEG", "IMG_4980.JPEG",
          "IMG_4981.JPEG", "IMG_4982.JPEG", "IMG_4984.JPEG", "IMG_4986.JPEG",
          "IMG_4989.JPEG", "IMG_4992.JPEG", "IMG_4994.JPEG", "IMG_4995.JPEG",
          "IMG_4996.JPEG", "IMG_5001.JPEG", "IMG_5002.JPEG", "IMG_5006.JPEG",
          "IMG_5007.JPEG", "IMG_5009.JPEG", "IMG_5010.JPEG", "IMG_5011.JPEG",
          "IMG_5012.JPEG", "IMG_5013.JPEG", "IMG_5015.JPEG", "IMG_5016.JPEG",
          "IMG_5018.JPEG", "IMG_5019.JPEG", "IMG_5020.JPEG", "IMG_5022.JPEG",
          "IMG_5023.JPEG", "IMG_5024.JPEG", "IMG_5025.JPEG", "IMG_5026.JPEG",
          "IMG_5027.JPEG", "IMG_5028.JPEG", "IMG_5029.JPEG", "IMG_5030.JPEG",
          "IMG_5031.JPEG", "IMG_5032.JPEG", "IMG_5033.JPEG", "IMG_5034.JPEG",
          "IMG_5035.JPEG", "IMG_5036.JPEG", "IMG_5037.JPEG", "IMG_5038.JPEG",
          "IMG_5039.JPEG", "IMG_5040.JPEG", "IMG_5041.JPEG", "IMG_5042.JPEG",
          "IMG_5043.JPEG", "IMG_5044.JPEG", "IMG_5045.JPEG", "IMG_5046.JPEG",
          "IMG_5047.JPEG", "IMG_5048.JPEG", "IMG_5049.JPEG", "IMG_5050.JPEG",
          "IMG_5051.JPEG", "IMG_5052.JPEG", "IMG_5053.JPEG", "IMG_5054.JPEG",
          "IMG_5055.JPEG", "IMG_5056.JPEG", "IMG_5057.JPEG", "IMG_5058.JPEG",
          "IMG_5059.JPEG", "IMG_5060.JPEG", "IMG_5061.JPEG", "IMG_5062.JPEG",
          "IMG_5063.JPEG", "IMG_5064.JPEG", "IMG_5065.JPEG", "IMG_5066.JPEG",
          "IMG_5067.JPEG", "IMG_5068.JPEG", "IMG_5069.JPEG", "IMG_5070.JPEG",
          "IMG_5071.JPEG", "IMG_5072.JPEG", "IMG_5073.JPEG", "IMG_5074.JPEG",
          "IMG_5075.JPEG", "IMG_5076.JPEG", "IMG_5077.JPEG", "IMG_5078.JPEG",
          "IMG_5079.JPEG", "IMG_5080.JPEG", "IMG_5081.JPEG", "IMG_5082.JPEG",
          "IMG_5083.JPEG", "IMG_5084.JPEG", "IMG_5085.JPEG", "IMG_5086.JPEG",
          "IMG_5087.JPEG", "IMG_5088.JPEG", "IMG_5089.JPEG", "IMG_5090.JPEG",
          "IMG_5091.JPEG", "IMG_5092.JPEG", "IMG_5093.JPEG", "IMG_5094.JPEG",
          "IMG_5095.JPEG", "IMG_5096.JPEG", "IMG_5097.JPEG", "IMG_5098.JPEG",
          "IMG_5099.JPEG", "IMG_5100.JPEG"
        ]
      },
      {
        category: "otaru",
        files: [
          "IMG_9053.JPEG", "IMG_9061.JPEG", "IMG_9062.JPEG", "IMG_9063.JPEG",
          "IMG_9065.JPEG", "IMG_9066.JPEG", "IMG_9070.JPEG", "IMG_9072.JPEG",
          "IMG_9073.JPEG", "IMG_9074.JPEG", "IMG_9077.JPEG", "IMG_9080.JPEG",
          "IMG_9081.JPEG", "IMG_9082.JPEG", "IMG_9083.JPEG", "IMG_9084.JPEG",
          "IMG_9085.JPEG", "IMG_9086.JPEG", "IMG_9087.JPEG", "IMG_9088.JPEG",
          "IMG_9089.JPEG", "IMG_9090.JPEG", "IMG_9091.JPEG", "IMG_9092.JPEG",
          "IMG_9093.JPEG", "IMG_9094.JPEG", "IMG_9095.JPEG", "IMG_9096.JPEG",
          "IMG_9097.JPEG", "IMG_9098.JPEG", "IMG_9099.JPEG", "IMG_9100.JPEG"
        ]
      },
      {
        category: "sapporo",
        files: [
          "IMG_9361.JPEG", "IMG_9362.JPEG", "IMG_9363.JPEG", "IMG_9364.JPEG",
          "IMG_9365.JPEG", "IMG_9366.JPEG", "IMG_9367.JPEG", "IMG_9368.JPEG",
          "IMG_9369.JPEG", "IMG_9370.JPEG", "IMG_9371.JPEG", "IMG_9372.JPEG",
          "IMG_9373.JPEG", "IMG_9374.JPEG", "IMG_9375.JPEG", "IMG_9376.JPEG",
          "IMG_9377.JPEG", "IMG_9378.JPEG", "IMG_9379.JPEG", "IMG_9380.JPEG",
          "IMG_9381.JPEG", "IMG_9382.JPEG", "IMG_9383.JPEG", "IMG_9384.JPEG",
          "IMG_9385.JPEG", "IMG_9386.JPEG", "IMG_9387.JPEG", "IMG_9388.JPEG",
          "IMG_9389.JPEG", "IMG_9390.JPEG", "IMG_9391.JPEG", "IMG_9392.JPEG"
        ]
      }
    ]);

    var nCount = 0, oCount = 0, sCount = 0;
    return raw.map(function (item) {
      var catIdx = 0;
      var cap = "";
      var name = item.name;

      if (item.category === "niseko") {
        catIdx = ++nCount;
        if (/3899|4119|4123/.test(name)) cap = "신치토세 공항 도착 & 니세코 설국으로 가는 길";
        else if (/4134|4150|4188/.test(name)) cap = "미드타운 니세코 체크인 & 창밖의 새하얀 설경";
        else if (/4210|4211|4217|4222/.test(name)) cap = "니세코 그랜드 히라후 베이스 도착 & 장비 점검";
        else if (/4243|4251|4263|4275/.test(name)) cap = "곤돌라 타고 오르는 홋카이도 설산 파노라마";
        else if (/4319|4323|4351/.test(name)) cap = "요테이산(양제산) 뷰를 마주하며 달리는 파우더 슬로프";
        else if (/4369|4370|4413|4419/.test(name)) cap = "봄에도 눈부신 니세코 설원 위 둘만의 질주";
        else if (/4437|4442|4449|4452/.test(name)) cap = "정상 휴게소에서 맛보는 따뜻한 코코아 & 핫도그";
        else if (/4456|4461|4482/.test(name)) cap = "짜릿한 급경사 파우더 코스 정복의 순간";
        else if (/4489|4490|4507/.test(name)) cap = "눈 덮인 자작나무 숲길 트리런 탐험";
        else if (/4517|4523|4541/.test(name)) cap = "슬로프 위 눈부신 햇살과 둘만의 행복한 미소";
        else if (/4542|4550|4553/.test(name)) cap = "오후 라이딩 & 황금빛으로 물드는 설산 능선";
        else if (/4562|4589|4591/.test(name)) cap = "베이스로 내려오는 마지막 런의 아쉬움과 뿌듯함";
        else if (/4600|4611|4614/.test(name)) cap = "굿찬 시내 이동 & 현지 로컬 마트 털기";
        else if (/4617|4626|4631/.test(name)) cap = "박현수 셰프의 특제 야식 요리 교실 오픈";
        else if (/4640|4654|4658/.test(name)) cap = "미드타운 라운지에서 따뜻한 차 한 잔의 여유";
        else if (/4659|4664|4680/.test(name)) cap = "니세코 둘째 날 아침 & 다시 설산으로 출발";
        else if (/4682|4701|4708/.test(name)) cap = "히라후 정상 리프트 탑승 & 더 넓어진 시야";
        else if (/4724|4734|4754/.test(name)) cap = "끝없이 펼쳐진 홋카이도의 하얀 대자연 파노라마";
        else if (/4759|4761|4766/.test(name)) cap = "설원 위에 남긴 우리 둘의 발자국과 보드 자국";
        else if (/4769|4770|4779/.test(name)) cap = "신나는 활주 & 카메라를 향해 브이!";
        else if (/4780|4798|4800/.test(name)) cap = "오후 눈꽃 쉼터에서 나눈 달콤한 휴식";
        else if (/4803|4815|4821/.test(name)) cap = "마지막 슬로프 질주 & 니세코 원정 피날레";
        else if (/4833|4836|4840/.test(name)) cap = "장비 정리 & 니세코 빌리지의 평화로운 오후";
        else if (/4842|4849|4855/.test(name)) cap = "온천욕 후 시원한 홋카이도 우유 한 잔";
        else if (/4861|4869|4874/.test(name)) cap = "굿찬역 근처 로컬 이자카야의 맛있는 저녁";
        else if (/4876|4879|4896/.test(name)) cap = "니세코 밤하늘을 수놓은 차가운 별빛들";
        else cap = "니세코 설산 슬로프의 아름다운 파노라마";
      } else if (item.category === "otaru") {
        catIdx = ++oCount;
        if (/9053|9061|9062/.test(name)) cap = "오타루 운하 도착 & 잔잔한 수면에 비친 붉은 벽돌 창고";
        else if (/9063|9065|9066/.test(name)) cap = "오타루 수산시장 삼각시장 카이센동 명가 방문";
        else if (/9070|9072|9073/.test(name)) cap = "신선함 폭발! 성게알·연어알 듬뿍 카이센동 먹방";
        else if (/9074|9077|9080/.test(name)) cap = "오타루 오르골당 본관 입성 & 신비로운 멜로디";
        else if (/9081|9082|9083/.test(name)) cap = "반짝이는 유리공예와 수천 개의 앤틱 오르골 구경";
        else if (/9084|9085|9086/.test(name)) cap = "증기시계 정각 알림 & 사카이마치 거리 산책";
        else if (/9087|9088|9089/.test(name)) cap = "르타오 본점 더블프로마쥬 치즈케이크 디저트 타임";
        else if (/9090|9091|9092/.test(name)) cap = "오타루 운하의 푸른 황혼과 가스등 낭만 야경";
        else cap = "낭만 가득한 오타루 감성 골목 산책길";
      } else {
        catIdx = ++sCount;
        if (/9361|9362|9363/.test(name)) cap = "삿포로 시내 입성 & 스스키노 니카상 네온사인";
        else if (/9364|9365|9366/.test(name)) cap = "인생 돈까스 맛집! 두툼한 히레카츠 정식 만찬";
        else if (/9367|9368|9369/.test(name)) cap = "오도리 공원 산책 & 삿포로 TV타워 뷰";
        else if (/9370|9371|9372/.test(name)) cap = "삿포로 미소라멘 거리 골목 탐방 & 진한 국물";
        else if (/9373|9374|9375/.test(name)) cap = "다누키코지 상점가 쇼핑 & 홋카이도 특산품 기념품";
        else if (/9376|9377|9378/.test(name)) cap = "삿포로 클래식 생맥주 한 잔과 함께한 밤";
        else if (/9379|9380|9381/.test(name)) cap = "신치토세 공항 로이스 초콜릿 & 귀국길 추억";
        else cap = "맛과 멋이 가득한 삿포로 도심 탐방";
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
      var cap = customCaptions[item.name] || "오사카 & 고베의 소중한 순간";
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
      var cap = customCaptions[item.name] || "도쿄 도심의 다채로운 풍경";
      return {
        type: item.type,
        url: TOKYO_BASE + item.name,
        caption: cap,
        name: item.name
      };
    });
  })()
});
