// ============================================================
// 🇰🇷 DATASET 1: DOMESTIC DESTINATIONS (13 SPOTS)
// Non-overlapping 8-direction Callouts with Leader Lines
// ============================================================
const DOMESTIC_SPOTS = [
  {
    id: "phoenix_park",
    nameKo: "평창 휘닉스파크",
    nameEn: "Phoenix Pyeongchang - Official Quidditch Base",
    badge: "홈 시즌 슬로프",
    milestone: "우리의 겨울 베이스캠프",
    flag: "🏂",
    coords: [128.3242, 37.5815],
    // 남동쪽으로 여유 있게 배치하여 수도권 및 평창 라벨 간 겹침 방지
    callout: { dx: 16, dy: 28, textAnchor: "start" },
    spots: ["몽블랑 정상 뷰", "익스트림 파크", "야간 라이딩 설원", "베이스 카페 & 핫초코"],
    desc: "새하얀 설원 위를 가르는 빗자루(스노보드) 활주가 시즌마다 펼쳐지는 둘만의 공식 홈그라운드 겨울 안식처.",
    letter: "“헤아릴 수 없이 즐겨 찾았던 휘닉스파크의 눈부신 슬로프. 매서운 칼바람도 신나게 활주하던 열정 앞에서는 시원하기만 했지. 야간 보딩 후 먹던 따끈한 간식과 그곳의 설경은 우리에겐 영원한 겨울의 집이야.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&auto=format&fit=crop", caption: "몽블랑 정상 눈꽃 설원" },
      { type: "image", url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=600&auto=format&fit=crop", caption: "새하얀 슬로프 라이딩" }
    ]
  },
  {
    id: "yongpyong",
    nameKo: "평창 용평리조트",
    nameEn: "Yongpyong Ski Resort - Peak Expedition",
    badge: "고산 설산 슬로프",
    milestone: "발왕산 설산 탐험",
    flag: "❄️",
    coords: [128.6811, 37.6439],
    // 동남쪽으로 배치하여 강릉/휘닉스파크와 겹침 방지
    callout: { dx: 18, dy: 14, textAnchor: "start" },
    spots: ["발왕산 케이블카", "레인보우 슬로프", "스카이워크 전망대"],
    desc: "발왕산 자락의 웅장한 설원을 몸소 경험하며 가슴 벅찬 활주를 즐겼던 고산 원정 스키장.",
    letter: "“발왕산 정상의 차가운 눈꽃 바람을 맞으며 섰던 그날의 설렘! 휘팍과는 또 다른 웅장함과 압도적인 산세를 함께 마주하며 즐겁게 눈 위를 달렸던 특별한 원정.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop", caption: "발왕산 고산 설경" }
    ]
  },
  {
    id: "gangneung",
    nameKo: "강원도 강릉",
    nameEn: "Gangneung - Siren Coast & Alchemic Roastery",
    badge: "동해 해안 순례",
    milestone: "바다 & 커피 투어",
    flag: "🌊",
    coords: [128.8761, 37.7519],
    callout: { dx: 18, dy: -8, textAnchor: "start" },
    spots: ["안목해변 커피거리", "초당 순두부 마을", "강문해변 포토존", "주문진 파도"],
    desc: "동해 바다의 시원한 파도와 초당 순두부, 마법의 커피 향이 어우러진 푸른 해안 성지순례 여정.",
    letter: "“시원하게 펼쳐진 강릉의 푸른 바닷가. 바닷바람을 맞으며 맛본 초당순두부의 고소한 풍미와, 안목해변 카페 창가에 앉아 파도 소리를 들으며 나눈 깊은 이야기들이 생생해.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", caption: "강릉 동해안 에메랄드 파도" }
    ]
  },
  {
    id: "seonjaedo",
    nameKo: "인천 선재도",
    nameEn: "Seonjaedo - Parting Sea Miracle",
    badge: "신비한 바닷길",
    milestone: "모세의 기적 목섬",
    flag: "🏝️",
    coords: [126.5367, 37.2347],
    // 서해 해상 방향(남서)으로 배치하여 산본/서울 라벨과 겹침 방지
    callout: { dx: -16, dy: 28, textAnchor: "end" },
    spots: ["목섬 모랫길", "뻘다방 이국적 카페", "서해 낙조 전망대"],
    desc: "조수간만의 차에 따라 하루에 두 번 바닷물이 갈라지는 목섬의 신비한 모랫길을 걸었던 서해의 낭만 은신처.",
    letter: "“물이 빠지며 서서히 모습을 드러내던 목섬의 황금빛 모랫길! 뻘다방에서 바라보던 붉은 서해 노을은 마치 남국의 섬에 온 것 같은 착각을 주었지.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop", caption: "선재도 서해 낙조" }
    ]
  },
  {
    id: "asan_dogo",
    nameKo: "아산 파라다이스 도고",
    nameEn: "Asan Dogo Hot Springs - Elixir Spa",
    badge: "치유의 유황 온천",
    milestone: "원기 회복 스파",
    flag: "♨️",
    coords: [126.9075, 36.7578],
    callout: { dx: 20, dy: 14, textAnchor: "start" },
    spots: ["야외 유황 스파풀", "나이트 스파", "파이어 이벤트 탕"],
    desc: "마법 포션처럼 피로를 단숨에 씻어내어 준 따뜻한 노천 온천수 스파.",
    letter: "“추운 공기 속에서 김이 모락모락 피어오르는 따뜻한 온천수에 몸을 담그고, 머리는 상쾌하고 몸은 나른하게 힐링했던 시간. 일상의 피로가 거짓말처럼 녹아내렸어.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&auto=format&fit=crop", caption: "노천 스파의 온기" }
    ]
  },
  {
    id: "busan",
    nameKo: "부산 (해운대 & 기장 아난티)",
    nameEn: "Busan - Coastal Fortress & Ananti Cove",
    badge: "남부 해안 휴양",
    milestone: "해운대 & 기장 아난티",
    flag: "⛵",
    coords: [129.1585, 35.1587],
    callout: { dx: 16, dy: 4, textAnchor: "start" },
    spots: ["해운대 해수욕장 백사장", "기장 아난티 코브 & 워터하우스", "해동용궁사 해안", "광안대교 야경"],
    desc: "남부 항구 도시 급행 여정! 활기찬 해운대 백사장과 바다 절벽 위 럭셔리 휴양지 아난티 코브에서 머물렀던 완벽한 힐링.",
    letter: "“해운대 파도 소리를 들으며 모래사장을 걷던 추억과, 기장 아난티의 아늑한 서재와 오션뷰 테라스에서 끝없는 바다를 보며 힐링했던 황홀한 휴식.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1590559899731-a372a1464e29?w=600&auto=format&fit=crop", caption: "부산 해운대와 해안 야경" }
    ]
  },
  {
    id: "bukhansan_caravan",
    nameKo: "북한산 카라반",
    nameEn: "Bukhansan Caravan - Forbidden Forest Camp",
    badge: "금지된 숲 야영",
    milestone: "별빛 글램핑",
    flag: "🏕️",
    coords: [126.9850, 37.6608],
    // 북서측 상공으로 분리 배치하여 서울 도심 라벨과 겹침 방지
    callout: { dx: -16, dy: -32, textAnchor: "end" },
    spots: ["숲속 카라반 글램핑", "바비큐 & 불멍", "북한산 둘레길 아침 산책"],
    desc: "도심 바로 곁 금지된 숲 자락의 마법 텐트처럼, 북한산 기슭 맑은 공기 속에서 즐긴 낭만 카라반 캠핑.",
    letter: "“밤이 깊어지면 타닥타닥 타오르는 모닥불 앞에서 마시멜로를 굽고 장작 타는 냄새를 맡으며 나누던 이야기들. 아침새 소리에 눈뜨던 숲속 힐링.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&auto=format&fit=crop", caption: "숲속 캠핑의 모닥불" }
    ]
  },
  {
    id: "hyehwa",
    nameKo: "대학로 혜화",
    nameEn: "Hyehwa Art Stage - 100 Date Milestone",
    badge: "❤️ 100번",
    milestone: "100번의 마법 같은 막",
    flag: "🎭",
    coords: [127.0017, 37.5822],
    // 서북서 방향으로 인출하여 월곡·하남 라인과 겹침 방지
    callout: { dx: -38, dy: -20, textAnchor: "end" },
    isMilestone: true,
    milestoneCount: "100번",
    spots: ["마로니에 공원", "대학로 소극장 연극 투어", "낙산공원 성곽길 야경", "골목 단골 카페"],
    desc: "무려 100번의 만남이 각인된 둘만의 영원한 메인 아지트! 연극과 예술, 사계절의 낭만이 모든 골목마다 숨 쉬는 곳.",
    letter: "“100번이라는 믿기지 않는 숫자만큼 쌓여있는 우리의 웃음소리. 연극의 감동을 나누며 걷던 마로니에 공원, 낙산공원 성곽길에서 내려다본 서울의 밤 불빛... 혜화의 모든 길목이 우리의 무대였어.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop", caption: "낭만의 소극장 거리" }
    ]
  },
  {
    id: "wolgok",
    nameKo: "월곡 데이트",
    nameEn: "Wolgok Sanctuary - 200 Date Milestone",
    badge: "🌙 200번",
    milestone: "200번의 포근한 일상",
    flag: "🌙",
    coords: [127.0414, 37.6027],
    // 동북동 방향으로 분리하여 혜화·하남 라벨과 겹침 방지
    callout: { dx: 34, dy: -24, textAnchor: "start" },
    isMilestone: true,
    milestoneCount: "200번",
    spots: ["월곡역 & 동덕여대 골목길", "단골 카페와 골목 맛집", "달빛 산책로", "포근한 동네 아지트"],
    desc: "무려 200번의 발걸음이 각인된 둘만의 다정하고 포근한 일상 안식처! 사계절의 온기를 가장 가까이에서 나누었던 소중한 동네 아지트.",
    letter: "“200번이라는 시간 동안 함께 걸었던 월곡의 골목길들. 화려한 명소보다 더 따뜻하게 우리를 맞아주던 단골 가게들과 소소한 저녁 산책길... 언제 찾아가도 가장 마음 편한 우리만의 비밀 기지.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop", caption: "월곡 골목 단골 카페의 온기" },
      { type: "image", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop", caption: "골목길 달빛 산책" }
    ]
  },
  {
    id: "seoul_all",
    nameKo: "서울 데이트 전역",
    nameEn: "Seoul Metropolitan Heart - 300 Date Milestone",
    badge: "👑 300번",
    milestone: "300번의 찬란한 역사",
    flag: "✨",
    coords: [126.9780, 37.5665],
    // 서측 방향으로 인출하여 혜화·산본 라벨과 수직 간격 확보
    callout: { dx: -38, dy: 8, textAnchor: "end" },
    isMilestone: true,
    milestoneCount: "300번",
    spots: ["한강 텐트 피크닉 & 라면", "성수·한남 트렌디 골목", "남산타워 뷰", "익선동 & 북촌 한옥길"],
    desc: "서울 하늘 아래 300번이 넘는 계절을 함께 통과하며 사랑을 쌓아 올린 둘만의 거대한 수도 결계망.",
    letter: "“봄날의 벚꽃, 여름날의 한강 밤도깨비, 가을의 고궁 돌담길, 겨울의 반짝이는 빌딩 숲... 300번의 하루하루가 모여 만들어낸 우리만의 가장 눈부신 마법의 수도.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&auto=format&fit=crop", caption: "서울 도심의 황홀한 야경" }
    ]
  },
  {
    id: "sanbon_pyeongchon",
    nameKo: "산본 & 평촌",
    nameEn: "Sanbon & Pyeongchon - Cozy Alley Romance",
    badge: "도심 아지트",
    milestone: "산본 중심상가 & 평촌 공원",
    flag: "☕",
    coords: [126.9385, 37.3620],
    // 남서측으로 배치하여 서울 전역 및 선재도 라벨과 겹침 방지
    callout: { dx: -24, dy: 22, textAnchor: "end" },
    spots: ["산본 로데오 중심상가", "평촌 중앙공원 잔디 산책", "범계 로데오 맛집 골목", "아늑한 동네 카페"],
    desc: "산본 중심상가의 북적이는 맛집과 평촌 중앙공원의 여유로운 잔디 산책로를 오가며 편안하고 달콤한 일상을 나눈 우리만의 아늑한 거점.",
    letter: "“산본과 평촌의 익숙하고 다정한 거리들! 맛있는 음식을 먹고 평촌 공원을 천천히 거닐며 나눈 수많은 이야기들 속에서 우리의 계절이 소담하게 깊어졌지.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop", caption: "따뜻한 카페와 골목 풍경" }
    ]
  },
  {
    id: "hanam_starfield",
    nameKo: "하남 스타필드",
    nameEn: "Hanam Starfield - Grand Muggle Bazaar",
    badge: "실내 보물창고",
    milestone: "대형 몰 탐방",
    flag: "🛍️",
    coords: [127.2244, 37.5455],
    // 동측으로 배치하여 월곡·에버랜드 라벨과 겹침 방지
    callout: { dx: 26, dy: 2, textAnchor: "start" },
    spots: ["아쿠아필드 힐링", "고메스트리트 맛집 투어", "스포츠몬스터 & 쇼핑몰"],
    desc: "사계절 날씨에 구애받지 않고 맛있는 음식과 쇼핑, 엔터테인먼트를 알차게 누렸던 거대 실내 보물창고.",
    letter: "“비가 오거나 날이 궂을 때마다 손잡고 신나게 돌아다니던 하남 스타필드. 맛있는 거 잔뜩 먹고 소소한 구경거리에 함께 웃었던 다정한 일상들.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop", caption: "활기찬 마켓 플레이스" }
    ]
  },
  {
    id: "everland",
    nameKo: "용인 에버랜드",
    nameEn: "Yongin Everland - Fantastic Beasts Realm",
    badge: "환상 테마파크",
    milestone: "신비한 동물 & 롤러코스터",
    flag: "🎡",
    coords: [127.2013, 37.2939],
    // 남동측으로 배치하여 하남 및 산본 라벨과 겹침 방지
    callout: { dx: 26, dy: 20, textAnchor: "start" },
    spots: ["티익스프레스 마법 롤러코스터", "로스트밸리 & 사파리 월드", "포시즌스 가든 꽃축제", "문라이트 야간 퍼레이드"],
    desc: "신비한 동물들과 아찔한 마법 열차(티익스프레스)가 허공을 질주하는 머글 세계 최대 규모의 환상 테마파크 원정.",
    letter: "“티익스프레스를 타고 최고점에서 수직 낙하할 때의 짜릿한 비명과 웃음! 사파리에서 만난 귀여운 동물들과 밤하늘을 수놓던 화려한 퍼레이드와 불꽃까지 동화 같았던 하루.”",
    photos: [
      { type: "image", url: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=600&auto=format&fit=crop", caption: "환상의 테마파크와 롤러코스터" },
      { type: "image", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop", caption: "화려한 야간 축제와 불빛" }
    ]
  }
];

// ============================================================
// 🛠️ 미디어 아이템 생성 헬퍼 함수
// 파일명 배열만 입력하면 확장자(.mp4, .mov 등)를 파악해 type을 자동 지정하고,
// 카테고리(category) 및 폴더(folder)를 일괄 매핑하여 코드 길이를 대폭 압축합니다.
// ============================================================
function createMediaItems(input, defaultCategory, defaultFolder) {
  var list = [];
  if (Array.isArray(input)) {
    input.forEach(function (entry) {
      if (typeof entry === "string") {
        var isVid = /\.(mp4|mov)$/i.test(entry);
        list.push({
          type: isVid ? "video" : "image",
          name: entry,
          category: defaultCategory || "",
          folder: defaultFolder || ""
        });
      } else if (entry && Array.isArray(entry.files)) {
        var cat = entry.category || defaultCategory || "";
        var fol = entry.folder || defaultFolder || "";
        entry.files.forEach(function (fileName) {
          var isVid = /\.(mp4|mov)$/i.test(fileName);
          list.push({
            type: isVid ? "video" : "image",
            name: fileName,
            category: cat,
            folder: fol
          });
        });
      } else if (entry && entry.name) {
        if (!entry.type) {
          entry.type = /\.(mp4|mov)$/i.test(entry.name) ? "video" : "image";
        }
        if (!entry.category && defaultCategory) entry.category = defaultCategory;
        if (!entry.folder && defaultFolder) entry.folder = defaultFolder;
        list.push(entry);
      }
    });
  }
  return list;
}


// ============================================================
// 🌐 DATASET 2: OVERSEAS DESTINATIONS
// 각 나라별 데이터는 아래의 spot-*.js 파일들에서 OVERSEAS_SPOTS에 자동 등록됩니다:
// - spot-bali.js     (인도네시아 발리)
// - spot-canada.js   (캐나다 옐로나이프, 휘슬러, 밴쿠버)
// - spot-japan.js    (일본 니세코, 오사카, 도쿄)
// - spot-swiss.js    (스위스 5대 도시)
// - spot-vietnam.js  (베트남 푸꾸옥)
// ============================================================
const OVERSEAS_SPOTS = [];