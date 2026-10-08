// ============================================================
// 🇨🇦 OVERSEAS DESTINATION: CANADA (캐나다)
// 옐로나이프, 휘슬러, 빅토리아, 밴쿠버 대탐험 사진/영상 데이터
// ============================================================
OVERSEAS_SPOTS.push({
  id: "canada",
  nameKo: "캐나다 (옐로나이프, 휘슬러, 빅토리아, 밴쿠버)",
  nameEn: "Canada (Yellowknife · Whistler, Victoria, Vancouver)",
  badge: "2025.12",
  milestone: "로키 설경 & 오로라 대탐험",
  flag: "🇨🇦",
  coords: [-119.5, 54.0],
  callout: { dx: 14, dy: 0, textAnchor: "start" },
  cities: ["옐로나이프", "휘슬러", "빅토리아", "밴쿠버"],
  spots: ["옐로나이프 오로라 빌리지", "휘슬러 블랙콤 스키장", "밴쿠버 개스타운", "빅토리아 부차트 가든"],
  desc: "북극권 밤하늘에서 초록빛 커튼을 흔드는 오로라와 세계적인 설산 휘슬러, 밴쿠버까지 누빈 캐나다 윈터 대탐험.",
  letter: "“영하 30도 혹한 속에서 초록빛 물결로 춤추던 옐로나이프의 오로라와 자연 하얀색 마스카라... 그리구 세계 2대?? 스키장!”",
  subAlbums: [
    {
      id: "yellowknife",
      name: "옐로나이프",
      tag: "🌌 옐로나이프",
      desc: "영하 30도 혹한 속 초록빛 오로라 춤의 향연",
      cover: "images/여행지/캐나다_옐로나이프_휘슬러/1. 옐로나이프/DSC01996.JPEG"
    },
    {
      id: "whistler",
      name: "휘슬러 & 블랙콤",
      tag: "🏂 휘슬러",
      desc: "우리도 맛봤다. 휘슬러 블랙콤 스키장 파우더 설원.",
      cover: "images/여행지/캐나다_옐로나이프_휘슬러/2. 휘슬러&블랙콤/IMG_4717.JPEG"
    },
    {
      id: "vancouver",
      name: "밴쿠버 & 빅토리아",
      tag: "🇨🇦 밴쿠버",
      desc: "개스타운 증기시계와 태평양 연안 & 빅토리아 크리스마스 조명.",
      cover: "images/여행지/캐나다_옐로나이프_휘슬러/밴쿠버&빅토리아/IMG_7311.JPEG"
    }
  ],
  photos: (function () {
    var CANADA_BASE = "images/여행지/캐나다_옐로나이프_휘슬러/";

    // ✍️ [사진별 커스텀 코멘트 작성란]
    // 원하는 사진/동영상의 파일명과 코멘트를 아래 객체에 적어주시면 우선 적용됩니다!
    var customCaptions = {
      "DSC01996.JPEG": "영하 30도 밤하늘을 수놓은 신비로운 초록빛 오로라 폭풍",
      "DSC02007.JPEG": "우리의 밤하늘을 가득 채운 초록빛 춤",
      "DSC02011.JPG": "눈 덮인 북극 숲과 춤추는 오로라 커튼",
      "IMG_4532.JPEG": "옐로나이프 도착! 설레는 첫 발걸음",
      "IMG_4717.JPEG": "휘슬러 블랙콤의 눈부신 알프스 설원 파노라마",
      "IMG_5807.JPG": "영하 30도의 밤, 둘만의 오로라 추억",
      "IMG_5808.JPG": "환상적인 오로라 아래 선명한 둘의 실루엣",
      "IMG_7311.JPEG": "밴쿠버 도심 산책과 태평양 연안의 상쾌한 겨울 공기"
    };

    var yellowknifeFiles = [
      "DSC01973.JPG", "DSC01976.JPG", "DSC01977.JPG", "DSC01982.JPG", "DSC01984.JPG",
      "DSC01995.JPG", "DSC01996.JPEG", "DSC02003.JPG", "DSC02007.JPEG", "IMG_4532.JPEG",
      "IMG_4539.JPEG", "IMG_4541.JPEG", "IMG_4544.JPEG", "IMG_4552.MOV", "IMG_4553.JPEG",
      "IMG_4559.JPEG", "IMG_4592.JPEG", "IMG_4595.JPEG", "IMG_4606.JPEG", "IMG_4614.JPEG",
      "IMG_4619.JPEG", "IMG_4635.JPEG", "IMG_4649.JPEG", "IMG_4655.JPEG", "IMG_4674.JPEG",
      "IMG_4682.MP4", "IMG_5630.JPEG", "IMG_5636.JPEG", "IMG_5643.JPEG", "IMG_5653.JPEG",
      "IMG_5659.JPEG", "IMG_5666.PNG", "IMG_5680.JPEG", "IMG_5691.JPEG", "IMG_5696.JPEG",
      "IMG_5699.JPEG", "IMG_5704.JPEG", "IMG_5708.JPEG", "IMG_5710.JPEG", "IMG_5715.JPEG",
      "IMG_5721.JPEG", "IMG_5736.JPEG", "IMG_5737.JPEG", "IMG_5739.JPEG", "IMG_5744.JPEG",
      "IMG_5746.JPEG", "IMG_5747.JPEG", "IMG_5748.JPEG", "IMG_5749.JPEG", "IMG_5754.JPEG",
      "IMG_5755.JPEG", "IMG_5756.MP4", "IMG_5758.MOV", "IMG_5763.MOV", "IMG_5766.JPEG",
      "IMG_5775.JPEG", "IMG_5794.JPEG", "IMG_5807.JPG", "IMG_5808.JPG", "IMG_5813.JPG",
      "IMG_5816.JPG", "IMG_5817.JPG", "IMG_5820.JPG", "IMG_5828.JPG", "IMG_5836.JPG",
      "IMG_5840.JPG", "IMG_5842.JPEG", "IMG_5854.JPG", "IMG_5861.JPG", "IMG_5862.JPG",
      "IMG_5866.JPG", "IMG_5872.JPG", "IMG_5873.JPG", "IMG_5885.JPG", "IMG_5887.JPG",
      "IMG_5888.JPG", "IMG_5893.JPG", "IMG_5894.JPEG", "IMG_5898.JPEG", "IMG_5901.JPEG",
      "IMG_5903.JPEG", "IMG_5905.MP4", "IMG_5908.JPEG", "IMG_5914.JPEG", "IMG_5917.MP4",
      "IMG_5919.JPEG", "IMG_5920.JPEG", "IMG_5922.PNG", "IMG_5925.JPEG", "IMG_5933.MP4",
      "IMG_5935.MP4", "IMG_5948.JPEG", "IMG_5957.JPEG", "IMG_5968.JPEG", "IMG_5976.JPEG",
      "IMG_5995.JPEG", "IMG_6014.JPEG", "IMG_6022.JPEG", "IMG_6029.JPEG", "IMG_6043.JPEG",
      "IMG_6048.JPEG", "IMG_6048-1.JPEG", "IMG_6050.JPEG", "IMG_6067.JPEG", "IMG_6076.JPEG",
      "IMG_6095.JPEG", "IMG_6103.JPEG", "IMG_6111.JPEG", "IMG_6115.JPEG", "IMG_6117.JPEG",
      "IMG_6122.JPEG", "IMG_6127.MP4", "IMG_6129.JPEG", "IMG_6139.JPEG", "IMG_6142.JPEG",
      "IMG_6159.JPEG", "IMG_6165.JPEG", "IMG_6179.JPEG", "IMG_6192.JPEG", "IMG_6198.MP4",
      "IMG_6200.JPEG", "IMG_6201.JPEG", "IMG_6206.MOV", "IMG_6214.JPEG", "IMG_6219.JPEG",
      "IMG_6254.JPEG", "IMG_6275.JPEG"
    ];

    var whistlerFiles = [
      "B59B85EA-54D2-4678-B821-1C03440E4225.MP4", "IMG_4717.JPEG", "IMG_4726.JPEG", "IMG_4732.JPEG", "IMG_4738.JPEG",
      "IMG_4743.JPEG", "IMG_4757.JPEG", "IMG_4778.JPEG", "IMG_4791.MP4", "IMG_4794.JPEG",
      "IMG_4805.JPEG", "IMG_4815.JPEG", "IMG_4840.JPEG", "IMG_4848.JPEG", "IMG_4854.JPEG",
      "IMG_4860.JPEG", "IMG_4871.JPEG", "IMG_4883.MP4", "IMG_4888.JPEG", "IMG_4895.JPEG",
      "IMG_4912.MP4", "IMG_4929.JPEG", "IMG_4939.JPEG", "IMG_4944.MP4", "IMG_4945.MP4",
      "IMG_4947.JPEG", "IMG_4958.JPEG", "IMG_4968.PNG", "IMG_4977.JPEG", "IMG_4983.JPEG",
      "IMG_5029.JPEG", "IMG_5057.JPEG", "IMG_5059.JPEG", "IMG_5063.JPEG", "IMG_5070.JPEG",
      "IMG_5071.JPEG", "IMG_5073.JPEG", "IMG_5112.JPEG", "IMG_5137.JPEG", "IMG_5145.JPEG",
      "IMG_5154.MP4", "IMG_5165.JPEG", "IMG_5167.JPEG", "IMG_5170.JPEG", "IMG_5181.JPEG",
      "IMG_5209.JPEG", "IMG_5231.JPEG", "IMG_5237.MP4", "IMG_5239.JPEG", "IMG_5249.PNG",
      "IMG_5256.JPEG", "IMG_6282.JPEG", "IMG_6296.JPEG", "IMG_6308.JPEG", "IMG_6314.JPEG",
      "IMG_6317.MP4", "IMG_6322.JPEG", "IMG_6326.JPEG", "IMG_6329.JPEG", "IMG_6331.JPEG",
      "IMG_6337.PNG", "IMG_6338.JPEG", "IMG_6345.JPEG", "IMG_6351.JPEG", "IMG_6365.JPEG",
      "IMG_6391.JPEG", "IMG_6393.JPEG", "IMG_6395.JPEG", "IMG_6397.JPEG", "IMG_6402.JPEG",
      "IMG_6410.JPEG", "IMG_6410-1.JPEG", "IMG_6414.JPEG", "IMG_6418.JPEG", "IMG_6419.MP4",
      "IMG_6429.MP4", "IMG_6434.JPEG", "IMG_6444.JPEG", "IMG_6454.JPEG", "IMG_6459.JPEG",
      "IMG_6467.JPEG", "IMG_6469.MP4", "IMG_6470.MP4", "IMG_6474.MP4", "IMG_6485.JPEG",
      "IMG_6490.JPEG", "IMG_6492.JPEG", "IMG_6495.JPEG", "IMG_6497.JPEG", "IMG_6501.JPEG",
      "IMG_6502.JPEG", "IMG_6507.JPEG", "IMG_6513.JPEG", "IMG_6516.JPEG", "IMG_6519.JPEG",
      "IMG_6520.MP4", "IMG_6521.MP4", "IMG_6522.MP4", "IMG_6535.JPEG", "IMG_6539.MP4",
      "IMG_6541.JPEG", "IMG_6543.MP4", "IMG_6549.JPEG", "IMG_6552.JPEG", "IMG_6561.MP4",
      "IMG_6562.JPEG", "IMG_6563.MP4", "IMG_6564.JPEG", "IMG_6570.JPEG", "IMG_6594.JPEG",
      "IMG_6599.JPEG", "IMG_6617.JPEG", "IMG_6623.JPEG", "IMG_6629.JPEG", "IMG_6642.JPEG",
      "IMG_6647.JPEG", "IMG_6648.JPEG", "IMG_6655.JPEG", "IMG_6657.JPEG", "IMG_6659.JPEG",
      "IMG_6665.JPEG", "IMG_6668.JPEG", "IMG_6670.JPEG", "IMG_6674.JPEG", "IMG_6680.JPEG",
      "IMG_6690.PNG", "IMG_6691.JPEG", "IMG_6702.JPEG", "IMG_6708.JPEG", "IMG_6715.MP4",
      "IMG_6722.JPEG", "IMG_6725.JPEG", "IMG_6733.MP4", "IMG_6739.JPEG", "IMG_6747.JPEG",
      "IMG_6756.JPEG", "IMG_6795.JPEG", "IMG_6802.JPEG", "IMG_6806.JPEG", "IMG_6843.JPEG",
      "IMG_6850.JPEG", "IMG_6862.JPEG", "IMG_6868.JPEG", "IMG_6880.JPEG", "IMG_6887.JPEG",
      "IMG_6887-1.JPEG", "IMG_6891.JPEG", "IMG_6905.JPEG", "IMG_6907.JPEG", "IMG_6931.JPEG",
      "IMG_6932.JPEG", "IMG_6949.MP4", "IMG_6953.MP4", "IMG_6957.MP4", "IMG_6962.JPEG",
      "IMG_6970.JPEG", "IMG_6983.JPEG", "IMG_7007.JPEG", "IMG_7012.MP4", "IMG_7017.JPEG",
      "IMG_7024.JPEG", "IMG_7036.MP4", "IMG_7039.MP4", "IMG_7040.MP4", "IMG_7041.MP4",
      "IMG_7042.MP4", "IMG_7043.MP4", "IMG_7050.JPEG", "IMG_7058.MP4", "IMG_7059.MP4",
      "IMG_7064.JPEG", "IMG_7068.JPEG", "IMG_7072.JPEG", "IMG_7073.MP4", "IMG_7074.JPEG",
      "IMG_7077.JPEG", "IMG_7082.JPEG", "IMG_7086.JPEG", "IMG_7090.JPEG", "IMG_7104.JPEG",
      "IMG_7105.JPEG", "IMG_7108.JPEG", "IMG_7120.JPEG", "IMG_7123.MP4", "IMG_7125.MP4",
      "IMG_7135.JPEG", "IMG_7137.JPEG", "IMG_7149.JPEG", "IMG_7152.JPEG", "IMG_7158.JPEG",
      "IMG_7160.JPEG", "IMG_7164.JPEG", "IMG_7166.JPEG", "IMG_7170.JPEG", "IMG_7180.JPEG",
      "IMG_7184.JPEG", "IMG_7188.JPEG", "IMG_7194.JPEG", "IMG_7208.JPEG", "IMG_7221.JPEG",
      "IMG_7223.JPEG", "IMG_7227.JPEG", "IMG_7233.JPEG", "IMG_7236.JPEG", "IMG_7247.JPEG",
      "IMG_7266.JPEG"
    ];

    var vancouverFiles = [
      "IMG_5276.JPEG", "IMG_5294.JPEG", "IMG_5317.JPEG", "IMG_5331.JPEG", "IMG_5353.JPEG",
      "IMG_5403.MP4", "IMG_7311.JPEG", "IMG_7317.JPEG", "IMG_7336.JPEG", "IMG_7344.JPEG",
      "IMG_7355.JPEG", "IMG_7365.JPEG", "IMG_7372.JPEG", "IMG_7405.JPEG", "IMG_7416.JPEG",
      "IMG_7426.JPEG", "IMG_7438.JPEG", "IMG_7456.JPEG", "IMG_7460.JPEG", "IMG_7470.JPEG",
      "IMG_7472.JPEG", "IMG_7492.JPEG", "IMG_7535.JPEG", "IMG_7553.JPEG", "IMG_7567.JPEG",
      "IMG_7620.JPEG", "IMG_7629.JPEG", "IMG_7658.JPEG", "IMG_7688.JPEG", "IMG_7710.JPEG",
      "IMG_7734.JPEG", "IMG_7738.JPEG", "IMG_7751.JPEG", "IMG_7777.JPEG", "IMG_7784.JPEG",
      "IMG_7803.JPEG", "IMG_7829.JPEG", "IMG_7840.JPEG", "IMG_7852.JPEG", "IMG_7911.JPEG",
      "IMG_7934.JPEG", "IMG_7941.JPEG", "IMG_7977.JPEG", "IMG_7992.JPEG", "IMG_8001.JPEG",
      "IMG_8028.JPEG", "IMG_8064.JPEG", "IMG_8081.JPEG", "IMG_8134.JPEG", "IMG_8144.JPEG",
      "IMG_8173.JPEG", "IMG_8255.JPEG", "IMG_8261.JPEG", "IMG_8285.JPEG", "IMG_8291.JPEG",
      "IMG_8293.JPEG", "IMG_8306.JPEG"
    ];

    var raw = [];
    yellowknifeFiles.forEach(function (name) {
      var isVid = /\.(mp4|mov)$/i.test(name);
      raw.push({ type: isVid ? "video" : "image", name: name, category: "yellowknife", folder: "1. 옐로나이프" });
    });
    whistlerFiles.forEach(function (name) {
      var isVid = /\.(mp4|mov)$/i.test(name);
      raw.push({ type: isVid ? "video" : "image", name: name, category: "whistler", folder: "2. 휘슬러&블랙콤" });
    });
    vancouverFiles.forEach(function (name) {
      var isVid = /\.(mp4|mov)$/i.test(name);
      raw.push({ type: isVid ? "video" : "image", name: name, category: "vancouver", folder: "밴쿠버&빅토리아" });
    });

    var ykStories = [
      "영하 30도 혹한의 땅 옐로나이프 공항 첫 발걸음",
      "북극권에 온 걸 실감케 하는 매서운 칼바람",
      "두꺼운 캐나다구스 방한복과 방한화 풀착장 완료!",
      "하얗게 눈 덮인 옐로나이프 다운타운 첫 산책",
      "설레는 마음으로 숙소 체크인 & 핫팩 장전",
      "창밖으로 끝없이 펼쳐진 새하얀 설경 파노라마",
      "오로라 빌리지로 향하는 설레는 버스 안에서",
      "뽀드득 눈길을 밟으며 맞이한 옐로나이프의 상쾌한 아침",
      "영하 30도의 날씨에도 신나서 절로 나오는 웃음",
      "귀여운 썰매견들이 반갑게 짖으며 맞아주는 개썰매장 도착!",
      "에너지 넘치게 꼬리를 흔드는 사랑스러운 허스키 친구들",
      "나무 썰매에 올라타 눈밭 질주 준비 완료!",
      "눈 덮인 침엽수림을 가르는 신나는 개썰매 라이딩",
      "힘차게 눈보라를 일으키며 설원을 질주하는 썰매견들",
      "바람을 가르며 만끽한 북극권의 웅장한 대자연",
      "개썰매 위에서 신나게 환호하며 브이!",
      "열심히 달려준 썰매견 친구들과 따뜻하게 눈맞춤",
      "영하 30도 혹한에 속눈썹이 하얗게 얼어붙은 순간!",
      "자연산 화이트 마스카라 완성! 신기해서 찍은 얼음 눈썹",
      "입김이 내뿜자마자 얼어붙는 북극의 신비로운 추위",
      "꽁꽁 언 손발을 녹여주는 따뜻한 통나무 산장 휴식",
      "옐로나이프 로컬 식당에서 맛본 든든한 점심 식사",
      "따끈따끈한 수프와 고기 요리로 에너지 완충",
      "꽁꽁 얼어붙은 그레이트슬레이브 호수 위를 걸어보다",
      "발이 푹푹 빠지는 깊은 눈밭 위 둘만의 발자국",
      "눈꽃이 소복하게 내려앉은 북극 숲의 고요한 정취",
      "스노모빌에 올라타 호수 위를 시원하게 질주!",
      "얼음 바람을 가르며 달리는 짜릿한 극지방 스피드",
      "설원 한가운데서 남긴 인생 첫 북극 인증샷",
      "뉘엿뉘엿 해가 지며 분홍빛과 보랏빛으로 물드는 북극 하늘",
      "어둠이 내리자 불을 밝히는 오로라 빌리지의 티피(Teepee)",
      "하얀 설원 위로 솟아오른 원뿔형 티피 텐트의 동화 같은 야경",
      "티피 텐트 안 활활 타오르는 장작 난로 앞에서 몸 녹이기",
      "얼어붙은 몸을 사르르 녹여주는 달콤하고 따뜻한 핫초코",
      "삼각대를 단단히 고정하고 밤하늘을 보며 두근두근 대기",
      "칠흑 같은 밤하늘에 쏟아질 듯 총총 박힌 북극의 별빛",
      "저 멀리 지평선 너머로 서서히 피어오르는 은은한 초록빛",
      "카메라 셔터를 누르는 순간 선명하게 잡힌 첫 오로라의 흔적!",
      "밤하늘을 가로지르며 서서히 넓게 번져가는 초록빛 리본",
      "바람결을 따라 너울너울 춤추는 신비로운 오로라 커튼",
      "온 밤하늘이 초록빛으로 가득 찬 경이로운 대자연의 축복",
      "티피 텐트 삼각 지붕 위로 황홀하게 쏟아지는 오로라 폭풍",
      "영하 30도의 매서운 추위도 까맣게 잊게 만든 숨막히는 절경",
      "춤추는 오로라를 배경으로 나란히 선 둘의 로맨틱한 실루엣",
      "평생 잊지 못할 둘만의 북극 오로라 인생샷 완성!",
      "초록빛에 붉은빛이 섞여 요동치는 격렬한 오로라 서브스톰",
      "눈 덮인 호수 수면에 은은하게 반사되는 오로라의 물결",
      "고개만 들면 온통 오로라로 가득했던 기적 같은 순간",
      "숨죽이며 하늘을 바라보며 연신 터뜨린 감탄사",
      "밤하늘 가득 춤추는 빛을 바라보며 나눈 따뜻한 온기",
      "새벽하늘을 수놓은 오로라의 긴 여운을 가슴에 담고",
      "숙소로 돌아와 꽁꽁 언 몸을 녹이며 먹은 꿀맛 컵라면",
      "늦은 아침, 창밖으로 눈부시게 쏟아지는 북극의 햇살",
      "옐로나이프 올드타운 역사 지구를 걸으며 만난 고즈넉함",
      "유명한 로컬 맛집 불럭스 비스트로(Bullocks Bistro) 입성",
      "갓 구워낸 옐로우나이프 신선한 생선 요리와 감자튀김",
      "통나무 벽마다 빼곡하게 적힌 전 세계 여행자들의 방명록",
      "우리도 한구석에 소중하게 남겨둔 둘만의 흔적",
      "얼어붙은 강가에 옹기종기 모여 있는 수상가옥 풍경",
      "북극권 기념품 숍에서 만난 귀여운 북극곰과 순록 인형",
      "오로라 드림캐처와 예쁜 마그넷을 고르는 행복한 시간",
      "둘째 날 밤, 다시 찾아온 오로라 빌리지의 설렘",
      "티피 굴뚝에서 몽글몽글 피어오르는 따뜻한 장작 연기",
      "어제보다 한층 더 맑고 투명해진 북극의 밤공기",
      "또다시 밤하늘을 수놓으며 춤추기 시작한 초록빛 물결",
      "마치 하늘에서 커튼이 펄럭이듯 거대하게 쏟아지는 빛",
      "순간순간 모습을 바꾸며 밤하늘을 가득 채운 빛의 왈츠",
      "오로라 사이로 별똥별이 스쳐 지나간 잊을 수 없는 찰나",
      "손을 뻗으면 그대로 잡힐 듯 가깝게 내려앉은 빛의 베일",
      "추위도 잊은 채 아이처럼 환하게 웃으며 찍은 기념사진",
      "서로의 손을 꼭 쥐고 바라본 황홀경의 북극 밤",
      "카메라 렌즈로도 다 담아내지 못하는 광활한 우주의 신비",
      "옐로나이프가 우리에게 건넨 가장 찬란한 겨울 선물",
      "티피 안에서 장작불을 바라보며 나눈 소소한 이야기들",
      "새하얀 설원 위에 길게 드리워진 달빛과 우리의 그림자",
      "아침 햇살에 반짝이는 눈꽃들을 보며 아쉬운 짐 정리",
      "방한복을 반납하며 옐로나이프와 나눈 작별 인사",
      "공항으로 향하는 차창 밖으로 스쳐 지나가는 하얀 숲",
      "영하 30도의 혹한도 따뜻하게 녹여준 둘만의 시간",
      "작지만 정겨운 옐로나이프 공항 대기실에서",
      "비행기 날개 아래로 끝없이 펼쳐진 북극 툰드라 설원",
      "구름 위로 솟아오르며 다음 목적지 휘슬러를 향해 출발!"
    ];

    var whStories = [
      "시투스카이(Sea to Sky) 고속도로를 달려 휘슬러 입성!",
      "웅장한 설산들이 반겨주는 세계적인 스키 리조트 휘슬러",
      "유럽풍 감성이 물씬 풍기는 아늑한 휘슬러 빌리지 도착",
      "설레는 마음으로 스키 리조트 호텔 체크인",
      "스노보드 장비 렌탈 숍에서 장비 세팅 & 부츠 피팅",
      "내일의 슬로프 정복을 기대하며 빌리지 둘러보기",
      "크리스마스 트리 조명이 반짝이는 휘슬러 빌리지의 밤",
      "창밖으로 쏟아지는 함박눈을 보며 설레는 밤",
      "아침 일찍 든든하게 브런치 챙겨 먹고 슬로프로 출발!",
      "곤돌라 탑승장으로 향하는 신나는 발걸음",
      "블랙콤 곤돌라에 보드를 싣고 오르는 순간",
      "발아래로 아득하게 펼쳐진 침엽수림 설경 파노라마",
      "해발 2,000m 고지에 도착하자 눈앞에 펼쳐진 순백의 세상",
      "최고의 설질을 자랑하는 로키산맥 천연 샴페인 파우더!",
      "보드 바인딩을 단단히 조이고 슬로프 라이딩 준비",
      "눈보라를 일으키며 거침없이 설원을 가르는 첫 런!",
      "부드럽고 푹신한 파우더 눈 위를 떠다니는 기분",
      "탁 트인 능선을 따라 시원하게 이어지는 롱 턴",
      "슬로프 한가운데서 알프스 부럽지 않은 로키 설산 배경 찰칵",
      "눈부신 햇살 아래 반짝이는 만년설 봉우리들",
      "자작나무와 침엽수가 우거진 환상의 트리런(Tree Run) 코스",
      "나무 사이를 요리조리 빠져나가는 짜릿한 활주",
      "자연 범프를 점프하며 만끽한 스릴 넘치는 라이딩",
      "넘어져도 눈이 솜사탕처럼 부드러워 그저 즐거운 순간",
      "정상 쉼터 라운드하우스 로지에 도착해 꿀맛 같은 휴식",
      "설산 꼭대기에서 먹는 따끈한 핫도그와 진한 핫초코!",
      "휘슬러와 블랙콤 봉우리를 이어주는 피크투피크(Peak 2 Peak) 곤돌라",
      "공중에 떠서 아찔한 깊이의 피츠시몬스 계곡을 내려다보다",
      "사방이 통유리로 트인 곤돌라 안에서 남긴 기념샷",
      "블랙콤 7th Heaven 슬로프 정상의 천국 같은 뷰",
      "발아래로 융단처럼 깔린 구름바다와 설산의 능선",
      "끝없는 내리막을 달리며 온몸으로 맞바람을 가르다",
      "서로의 라이딩 모습을 카메라에 담아주며 나눈 웃음",
      "오후의 부드러운 햇살에 황금빛으로 물드는 설원",
      "마지막 런을 아쉬워하며 베이스까지 단숨에 롱 카빙",
      "베이스에 도착해 보드를 풀고 뿌듯함에 하이파이브!",
      "스키 후 즐기는 아프레스키(Après-ski) 바의 활기찬 분위기",
      "휘슬러 로컬 수제 맥주 한 잔으로 피로를 시원하게 날리기",
      "불빛이 따뜻하게 켜진 휘슬러 빌리지 골목길 산책",
      "스노우 글로브 속에 들어온 듯 로맨틱한 눈 덮인 거리",
      "휘슬러 올림픽 플라자 오륜기 조형물 앞 인증샷",
      "신선한 캐나다 스테이크와 파스타로 즐긴 근사한 저녁 식사",
      "벽난로 가에 앉아 나눈 오늘 라이딩의 무용담",
      "호텔 야외 온수 스파에서 눈 맞으며 즐긴 힐링 온천욕",
      "둘째 날 아침, 밤새 새로 소복이 쌓인 파우더 눈!",
      "첫 곤돌라를 타기 위해 일찌감치 베이스로 집결",
      "아무도 밟지 않은 처녀설 위에 우리만의 첫 궤적을 그리다",
      "스프레이처럼 흩뿌려지는 파우더 눈꽃 세례",
      "한층 더 과감해진 스피드로 설원을 정복해 나가기",
      "눈 덮인 절벽 뷰포인트에서 남긴 멋진 보더 포즈",
      "구름 한 점 없이 새파란 하늘과 하얀 눈의 환상적인 대비",
      "산 정상 테라스 벤치에 걸터앉아 마신 커피 한 모금",
      "세계 최고의 스키장에 와있다는 실감 나는 행복",
      "오후 햇살을 받으며 달리는 여유로운 크루징 라이딩",
      "보드 들고 나란히 서서 활짝 웃는 둘만의 투샷",
      "눈밭에 누워 파란 하늘을 바라보며 만끽한 고요함",
      "마지막 하산길, 눈부신 설경을 눈에 꼭꼭 담아두며",
      "휘슬러 스키 원정을 성공적으로 마무리한 기쁨의 포옹",
      "빌리지 아기자기한 기념품 가게에서 보드 스티커 고르기",
      "휘슬러에서의 잊을 수 없는 겨울 스포츠 추억을 뒤로하고",
      "차를 타고 밴쿠버를 향해 내려가는 해안도로 풍경"
    ];

    var vcStories = [
      "밴쿠버 다운타운 입성! 상쾌한 태평양 해안 공기",
      "고층 빌딩과 눈 덮인 노스쇼어 산맥이 어우러진 도심 뷰",
      "밴쿠버의 유서 깊은 거리 개스타운(Gastown) 산책",
      "붉은 벽돌 건물과 가스등이 이어지는 고풍스러운 골목",
      "개스타운의 명물! 하얀 증기를 뿜는 앤틱 증기시계 앞 인증샷",
      "정각이 되자 기적 소리와 함께 뿜어져 나오는 신기한 증기",
      "캐나다 플레이스 해변 산책로에서 바라본 탁 트인 바다",
      "바다 너머로 하얀 눈을 머금은 웅장한 설산의 파노라마",
      "롭슨 스트리트에서 맛본 밴쿠버 유명 맛집과 카페",
      "스탠리 파크 해안도로를 따라 걸으며 만난 고요한 숲",
      "빅토리아 섬으로 향하는 대형 페리(BC Ferries) 탑승",
      "태평양 바닷바람을 맞으며 바라본 아름다운 조지아 해협",
      "페리 갑판 위에서 바다를 배경으로 시원한 바람맞기",
      "페리 주변을 맴도는 갈매기들과 평화로운 바다 풍경",
      "브리티시컬럼비아주의 주도, 낭만의 항구 도시 빅토리아 도착",
      "영국풍 고전미가 가득 풍기는 빅토리아 이너하버",
      "동화 속 궁전 같은 브리티시컬럼비아 주의사당 전경",
      "밤이 되자 수천 개의 전구로 불을 밝힌 주의사당의 야경",
      "화려한 크리스마스 일루미네이션으로 빛나는 빅토리아 항구",
      "세계적인 꽃의 정원 부차트 가든(Butchart Gardens) 입성",
      "겨울밤을 찬란하게 수놓은 부차트 가든 빛의 축제",
      "환상적인 조명 터널을 걸으며 남긴 로맨틱한 둘만의 사진",
      "아기자기한 빅토리아 구시가지 골목과 티룸 탐방",
      "향긋한 홍차와 스콘을 맛보며 누린 클래식한 애프터눈 티",
      "항구에 정박한 요트들과 어우러진 평화로운 일몰",
      "페리를 타고 다시 밴쿠버 야경을 향해 돌아가는 바닷길",
      "밴쿠버 그랜빌 아일랜드 퍼블릭 마켓의 활기찬 먹거리",
      "신선한 클램 차우더와 갓 구운 베이커리 만찬",
      "잉글리시 베이 해변에서 바라본 붉은 태평양 노을",
      "로키 설산부터 오로라, 대도시까지 이어진 캐나다 대탐험 피날레",
      "공항으로 향하며 나눈 소중하고 따뜻했던 캐나다의 추억"
    ];

    var yIdx = 0, wIdx = 0, vIdx = 0;
    return raw.map(function (item) {
      var cap = "";
      var name = item.name;

      if (customCaptions[name]) {
        cap = customCaptions[name];
      } else if (item.category === "yellowknife") {
        if (item.type === "video") cap = "🎬 [영상] 영하 30도 옐로나이프 오로라 빌리지 현장";
        else {
          cap = ykStories[yIdx % ykStories.length];
          yIdx++;
        }
      } else if (item.category === "whistler") {
        if (item.type === "video") cap = "🎬 [영상] 휘슬러 블랙콤 파우더 슬로프 다이내믹 라이딩";
        else {
          cap = whStories[wIdx % whStories.length];
          wIdx++;
        }
      } else {
        if (item.type === "video") cap = "🎬 [영상] 밴쿠버 & 빅토리아 태평양 해안 현장";
        else {
          cap = vcStories[vIdx % vcStories.length];
          vIdx++;
        }
      }

      return {
        type: item.type,
        url: CANADA_BASE + item.folder + "/" + item.name,
        caption: cap,
        category: item.category,
        name: item.name
      };
    });
  })()
});
