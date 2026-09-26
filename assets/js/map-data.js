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
// 🌐 DATASET 2: OVERSEAS DESTINATIONS (7 SPOTS)
// ============================================================
const OVERSEAS_SPOTS = [
  {
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
  },
  {
    id: "phuquoc",
    nameKo: "베트남 푸꾸옥",
    nameEn: "Phu Quoc, Vietnam",
    badge: "2024.07",
    milestone: "남국의 에메랄드 바캉스",
    flag: "🇻🇳",
    coords: [103.9630, 10.2899],
    callout: { dx: 14, dy: 4, textAnchor: "start" },
    cities: ["푸꾸옥 섬 일주"],
    spots: ["빈펄 사파리", "비오는 날 불꽃 놀이", "제트스키", "프리미어 빌리지", "해산물 레스토랑", "끊임 없는 마사지샵"],
    desc: "에메랄드빛 바다와 즐거운 제트스키, 맛있는 해산물과 망고스틴, 함께 여유롭게 쉬어갔던 한여름의 푸꾸옥 휴양.",
    letter: "“사파리 기린이랑 인사하던 현수. 망고스틴에 폭 빠져버린 현수. 동남아를 좋아하는 수인. 즈엉동 야시장에서 먹던 가리비 구이와 망고의 달콤함.”",
    photos: (function () {
      var PHUQUOC_BASE = "images/여행지/베트남_푸꾸옥/";
      var raw = createMediaItems([
        "IMG_6149.JPEG", "IMG_6153.JPEG", "IMG_4907.JPG", "IMG_3096.JPEG",
        "IMG_4903.JPG", "IMG_2984.jpeg", "IMG_3062.jpeg", "IMG_3300.jpeg",
        "IMG_3585.JPEG", "IMG_3609.JPEG", "IMG_3645.JPEG", "IMG_3664.JPEG",
        "IMG_6385.JPEG", "IMG_6391.JPEG", "IMG_4926.JPG", "IMG_4923.JPG",
        "IMG_4563.JPG", "dji_fly_0_0_0_1721367542267_video_cache.MP4",
        "dji_fly_0_0_0_1721367542272_video_cache.mp4", "IMG_7070.MP4",
        "IMG_7186.JPEG"
      ]);

      var customCaptions = {};
      var count = 0;
      return raw.map(function (item, idx) {
        var cap = "";
        var name = item.name;
        count++;
        if (customCaptions[name]) {
          cap = customCaptions[name];
        } else if (/6149|6153|4907|3096|4903/.test(name)) {
          cap = "푸꾸옥 도착 & 풀사이드 힐링";
        } else if (/2984/.test(name)) {
          cap = "빈펄 사파리 아기 코끼리와의 교감";
        } else if (/3062/.test(name)) {
          cap = "기린 레스토랑에서 기린에게 당근 간식 주기";
        } else if (/3300/.test(name)) {
          cap = "푸꾸옥 빈원더스 워터파크 물놀이";
        } else if (/3585|3609|3645|3664/.test(name)) {
          cap = "200일 기념 선셋타운 최고급 레스토랑!!";
        } else if (/6385|6391|4926|4923/.test(name)) {
          cap = "섬나라에서의 이탈리아 음식";
        } else if (/4563/.test(name)) {
          cap = "리조트 앞 푸른 바다와 해변 풍경";
        } else if (/dji.*267/.test(name)) {
          cap = "사오비치 제트스키 드론 영상 1";
        } else if (/dji.*272/.test(name)) {
          cap = "사오비치 제트스키 드론 영상 2";
        } else if (/7070/.test(name)) {
          cap = "현슈니의 첫 바캉스";
        } else if (/7186/.test(name)) {
          cap = "최고로 이쁜 숙소";
        } else if (item.type === "video") {
          cap = "푸꾸옥 현장 마법 영상 No." + count;
        } else {
          cap = "푸꾸옥 남국 바캉스 No." + count;
        }

        return {
          type: item.type,
          url: PHUQUOC_BASE + item.name,
          caption: cap,
          name: item.name
        };
      });
    })()
  },
  {
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
      return raw.map(function (item, idx) {
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
  },
  {
    id: "osaka",
    nameKo: "일본 오사카 (도톤보리·USJ·고베)",
    nameEn: "Osaka & Kobe, Japan",
    badge: "2025.03",
    milestone: "봄 미식 & 문화 탐방",
    flag: "🇯🇵",
    coords: [135.5023, 34.6937],
    callout: { dx: 14, dy: 16, textAnchor: "start" },
    cities: ["오사카", "도톤보리", "USJ", "고베"],
    spots: ["도톤보리 네온사인", "유니버설 스튜디오 USJ", "슈퍼 닌텐도 월드", "고베 하버랜드 야경"],
    desc: "봄기운이 가득했던 오사카와 고베. 도톤보리의 활기찬 미식부터 USJ 마법 세계와 닌텐도 월드, 고베 하버랜드의 로맨틱한 항만 야경까지 누빈 여정.",
    letter: "“글리코상 앞에서 익살맞게 포즈도 취하고, USJ 호그와트 성에서 마시던 버터맥주와 마리오 카트 레이싱! 고베 바닷바람을 맞으며 바라본 붉은 노을까지 잊지 못할 봄날의 시간들.”",
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
        "IMG_2608.JPEG": "유니버설 스튜디오 재팬(USJ) 입성!",
        "IMG_8659.JPEG": "USJ 마법 학교 호그와트 성과 호수 풍경",
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
      return raw.map(function (item, idx) {
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
  },
  {
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
    desc: "도쿄의 화려한 여름밤 야경과 트렌디한 골목길, 다채로운 도심 문화를 탐방했던 여행.",
    letter: "“붉은 도쿄타워 아래서 마신 시원한 음료와, 끝없이 교차하는 시부야 스크램블 속에서 느꼈던 도쿄만의 두근거리는 에너지!”",
    photos: (function () {
      var TOKYO_BASE = "images/여행지/일본_도쿄/";
      var raw = createMediaItems(["IMG_5660.jpeg", "IMG_5680.jpeg"]);

      var customCaptions = {
        "IMG_5660.jpeg": "도쿄 전통 장어덮밥(우나쥬) & 갓 구운 계란말이 만찬",
        "IMG_5680.jpeg": "시부야 스크램블 교차로 뷰 & 시원한 음료 타임"
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
  },
  {
    id: "canada",
    nameKo: "캐나다 (옐로나이프, 휘슬러)",
    nameEn: "Canada (Yellowknife · Whistler)",
    badge: "2025.12",
    milestone: "로키 설경 & 오로라 대탐험",
    flag: "🇨🇦",
    coords: [-119.5, 54.0],
    callout: { dx: 14, dy: 0, textAnchor: "start" },
    cities: ["옐로나이프", "휘슬러", "빅토리아", "밴쿠버"],
    spots: ["옐로나이프 오로라 빌리지", "휘슬러 블랙콤 스키", "밴쿠버 개스타운"],
    desc: "북극권 밤하늘에서 초록빛 커튼을 흔드는 오로라와 세계적인 설산 휘슬러, 밴쿠버까지 누빈 캐나다 윈터 대탐험.",
    letter: "“영하 30도 혹한 속에서 밤하늘 전체가 초록빛 물결로 춤추던 옐로나이프의 오로라... 평생 잊지 못할 가슴 벅찬 마법의 순간.”",
    subAlbums: [
      {
        id: "yellowknife",
        name: "옐로나이프",
        tag: "🌌 옐로나이프",
        desc: "영하 30도 혹한 속 초록빛 오로라 춤의 향연",
        cover: "images/여행지/캐나다_옐로나이프_휘슬러/DSC01996.JPEG"
      },
      {
        id: "whistler",
        name: "휘슬러",
        tag: "🏂 휘슬러",
        desc: "세계 최고 수준의 휘슬러 블랙콤 파우더 라이딩",
        cover: "images/여행지/캐나다_옐로나이프_휘슬러/IMG_5710.JPEG"
      },
      {
        id: "vancouver",
        name: "밴쿠버 & 빅토리아",
        tag: "🇨🇦 밴쿠버",
        desc: "밴쿠버 개스타운 & 태평양 연안의 아름다운 항구",
        cover: "images/여행지/캐나다_옐로나이프_휘슬러/IMG_7149.JPEG"
      }
    ],
    photos: (function () {
      var CANADA_BASE = "images/여행지/캐나다_옐로나이프_휘슬러/";
      var raw = createMediaItems([
        {
          category: "yellowknife",
          files: [
            "DSC01996.JPEG", "DSC02007.JPEG", "DSC02011.JPG", "IMG_5807.JPG",
            "IMG_5808.JPG", "IMG_5836.JPG", "IMG_5872.JPG"
          ]
        },
        {
          category: "whistler",
          files: [
            "IMG_5691.JPEG", "IMG_5696.JPEG", "IMG_5699.JPEG", "IMG_5704.JPEG",
            "IMG_5710.JPEG", "IMG_5721.JPEG", "IMG_5736.JPEG", "IMG_5739.JPEG",
            "IMG_5744.JPEG", "IMG_5746.JPEG", "IMG_5747.JPEG", "IMG_5748.JPEG",
            "IMG_5749.JPEG", "IMG_5754.JPEG", "IMG_5763.MOV"
          ]
        },
        {
          category: "vancouver",
          files: [
            "IMG_4544.JPEG", "IMG_4939.JPEG", "IMG_6351.JPEG", "IMG_6410-1.JPEG",
            "IMG_6410.JPEG", "IMG_6594.JPEG", "IMG_6887-1.JPEG", "IMG_6887.JPEG",
            "IMG_7149.JPEG", "IMG_7535.JPEG", "IMG_7688.JPEG", "IMG_7734.JPEG",
            "IMG_7738.JPEG", "IMG_8081.JPEG", "IMG_8144.JPEG", "IMG_8173.JPEG"
          ]
        }
      ]);

      var customCaptions = {};
      var yCount = 0, wCount = 0, vCount = 0;
      return raw.map(function (item, idx) {
        var catIdx = 0;
        var cap = "";
        var name = item.name;

        if (customCaptions[name]) {
          cap = customCaptions[name];
        } else if (item.category === "yellowknife") {
          catIdx = ++yCount;
          if (/1996|2007|2011/.test(name)) cap = "밤하늘을 수놓은 신비로운 초록빛 오로라 폭풍";
          else if (/5807|5808/.test(name)) cap = "영하 30도의 밤, 둘만의 오로라 헌팅 기념";
          else if (/5836|5872/.test(name)) cap = "눈 덮인 북극 숲과 춤추는 오로라 커튼";
          else cap = "옐로나이프 오로라 비경 No." + catIdx;
        } else if (item.category === "whistler") {
          catIdx = ++wCount;
          if (/5691|5696|5699/.test(name)) cap = "휘슬러 빌리지 도착 & 알프스 스타일 설산 리조트";
          else if (/5704|5710|5721/.test(name)) cap = "휘슬러 블랙콤 곤돌라 등반과 광활한 설원 뷰";
          else if (/5736|5739|5744/.test(name)) cap = "최고의 설질을 자랑하는 블랙콤 파우더 슬로프";
          else if (/5746|5747|5748|5749|5754/.test(name)) cap = "눈부신 설산 파노라마와 휘슬러 정상에서의 한 컷";
          else if (item.type === "video" || /5763/.test(name)) cap = "휘슬러 눈부신 설원 라이딩 현장 영상";
          else cap = "휘슬러 블랙콤 설원 No." + catIdx;
        } else {
          catIdx = ++vCount;
          if (/4544|4939/.test(name)) cap = "밴쿠버 도착 & 태평양 연안의 상쾌한 겨울 공기";
          else if (/6351|6410/.test(name)) cap = "밴쿠버 개스타운의 고풍스러운 붉은 벽돌과 증기시계";
          else if (/6594|6887/.test(name)) cap = "다운타운 워터프론트와 항구의 아름다운 풍경";
          else if (/7149|7535|7688/.test(name)) cap = "캐나다 감성 가득한 도심 산책과 미식 탐방";
          else if (/7734|7738|8081/.test(name)) cap = "빅토리아 페리와 태평양 바다의 탁 트인 전망";
          else if (/8144|8173/.test(name)) cap = "캐나다 겨울 대탐험을 기억하는 소중한 순간들";
          else cap = "밴쿠버 & 빅토리아 명소 No." + catIdx;
        }

        return {
          type: item.type,
          url: CANADA_BASE + item.name,
          caption: cap,
          category: item.category,
          name: item.name
        };
      });
    })()
  },
  {
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
    desc: "정글 감성의 우붓, 경이로운 바다 절벽의 누사페니다 섬, 트렌디한 해변과 황홀한 노을의 스미냑까지 만끽한 신들의 섬 발리 일주.",
    letter: "\"정글 새소리를 들으며 깨어나던 우붓의 아침, 켈링킹비치의 웅장한 절벽, 스미냑 비치베드에 누워 바라본 붉은 노을의 평화로움.\"",
    subAlbums: [
      {
        id: "ubud",
        name: "우붓 사진첩",
        tag: "🌿 우붓",
        desc: "우붓 정글 & 계곡의 싱그러운 휴양",
        cover: "images/여행지/인도네시아_발리/IMG_7450.JPEG"
      },
      {
        id: "nusa_penida",
        name: "누사페니다 사진첩",
        tag: "🦕 누사페니다",
        desc: "누사페니다 켈링킹비치 절벽 & 바다 비경",
        cover: "images/여행지/인도네시아_발리/DJI_20260720130535_0009_D.jpeg"
      },
      {
        id: "seminyak",
        name: "스미냑 사진첩",
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

      // 📝 특정 사진의 설명을 직접 바꾸고 싶을 때 여기에 등록하면 바로 반영됩니다!
      // 형식: "파일명": "원하는 한 줄 설명"
      var customCaptions = {
        // 예시: "IMG_3541.JPEG": "짐바란 해변 랍스터와 씨푸드 만찬!",
      };

      var uCount = 0, nCount = 0, sCount = 0;
      return raw.map(function (item, idx) {
        var catIdx = 0;
        var cap = "";
        var name = item.name;

        if (customCaptions[name]) {
          cap = customCaptions[name];
        } else if (item.category === "ubud") {
          catIdx = ++uCount;
          if (/7761|7828|7902/.test(name)) cap = "우붓 킨타마니 바투르산 일출";
          else if (/1413|1451|1495|1638|7374/.test(name)) cap = "우붓 전통 거리 & 몽키포레스트 탐방";
          else if (/1732|7434|7450|KNK06346|7517|GX017995/.test(name)) cap = "우붓 정글 리조트 & 인피니티 풀";
          else if (/1978|7739|7766|2020|2028|2039|2054/.test(name)) cap = "우붓 낭만 디너 & 테라스 풍경";
          else if (/2147/.test(name)) cap = "우붓의 상쾌한 아침 산책";
          else if (item.type === "video") cap = "우붓 정글 마법 영상 기록";
          else cap = "우붓 정글 & 계곡 휴양 No." + catIdx;
        } else if (item.category === "nusa_penida") {
          catIdx = ++nCount;
          if (/2180/.test(name)) cap = "누사페니다행 사누르 항구 페리";
          else if (/DJI.*130535|2273/.test(name)) cap = "누사페니다 켈링킹비치 절벽";
          else if (/DJI.*151049|7806|7826|7829|7846|7855/.test(name)) cap = "브로큰 비치 & 엔젤스 빌라봉 비경";
          else if (/8082|8092|8141|8216|8255|2345|2360/.test(name)) cap = "누사페니다 프라이빗 빌라 휴식";
          else if (/8285|8286|2378|2393/.test(name)) cap = "누사페니다 달빛 아래 저녁 식사";
          else if (/2421|2439|2444/.test(name)) cap = "누사페니다 아침 오션뷰";
          else if (/2496|8329|2518|8391|2538|2545/.test(name)) cap = "누사페니다 크리스탈 부이 해변";
          else if (item.type === "video") cap = "누사페니다 켈링킹비치 드론 영상";
          else cap = "누사페니다 신비로운 절벽 비경 No." + catIdx;
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
          else cap = "스미냑 선셋 & 해변 휴양 No." + catIdx;
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
  }
];
