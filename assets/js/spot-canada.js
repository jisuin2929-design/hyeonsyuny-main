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

    var yCount = 0, wCount = 0, vCount = 0;
    return raw.map(function (item) {
      var cap = "";
      var name = item.name;

      if (customCaptions[name]) {
        cap = customCaptions[name];
      } else if (item.category === "yellowknife") {
        yCount++;
        if (item.type === "video") cap = "🎬 [영상] 옐로나이프 생생 현장 스케치 No." + yCount;
        else if (/1973|1976|1977|1982|1984|1995|1996|2003|2007/.test(name)) cap = "밤하늘을 수놓은 신비로운 초록빛 오로라 폭풍 No." + yCount;
        else if (/5807|5808|5813|5816|5817|5820/.test(name)) cap = "영하 30도의 밤, 둘만의 오로라 추억 No." + yCount;
        else if (/5828|5836|5840|5872|5873/.test(name)) cap = "눈 덮인 북극 숲과 춤추는 오로라 커튼 No." + yCount;
        else cap = "옐로나이프 오로라 비경 No." + yCount;
      } else if (item.category === "whistler") {
        wCount++;
        if (item.type === "video") cap = "🎬 [영상] 휘슬러 블랙콤 슬로프 라이딩 No." + wCount;
        else if (/4717|4726|4732|4738|4743/.test(name)) cap = "휘슬러 빌리지 도착 & 알프스 설산 리조트 No." + wCount;
        else if (/5029|5057|5059|5070|5112/.test(name)) cap = "휘슬러 블랙콤 곤돌라 등반과 광활한 설원 뷰 No." + wCount;
        else if (/6308|6314|6322|6326|6345/.test(name)) cap = "최고의 설질을 자랑하는 블랙콤 파우더 슬로프 No." + wCount;
        else cap = "휘슬러 블랙콤 설원 No." + wCount;
      } else {
        vCount++;
        if (item.type === "video") cap = "🎬 [영상] 밴쿠버 & 빅토리아 명소 현장 No." + vCount;
        else if (/5276|5294|5317|5331|5353/.test(name)) cap = "밴쿠버 도착 & 태평양 연안의 상쾌한 공기 No." + vCount;
        else if (/7311|7317|7336|7344|7372/.test(name)) cap = "밴쿠버 개스타운의 고풍스러운 거리와 증기시계 No." + vCount;
        else if (/7734|7738|7751|7777|7784/.test(name)) cap = "빅토리아 페리와 태평양 바다의 탁 트인 전망 No." + vCount;
        else cap = "밴쿠버 & 빅토리아 명소 No." + vCount;
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
