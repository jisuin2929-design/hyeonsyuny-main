// ============================================================
// 🇻🇳 OVERSEAS DESTINATION: VIETNAM (베트남)
// 남국의 에메랄드 바캉스, 푸꾸옥
// ============================================================
OVERSEAS_SPOTS.push({
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
    return raw.map(function (item) {
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
});
