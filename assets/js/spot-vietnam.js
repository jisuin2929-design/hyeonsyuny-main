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

    // 🌴 푸꾸옥 사진 & 멘트 목록
    var phuquocPhotos = {
      "IMG_6149.JPEG": "푸꾸옥 도착 & 에메랄드빛 풀사이드 첫 힐링",
      "IMG_6153.JPEG": "프리미어 빌리지 풀빌라 리조트 전경 & 아늑한 휴식",
      "IMG_4907.JPG": "야자수 그늘 아래서 즐기는 여유로운 남국 바캉스",
      "IMG_3096.JPEG": "푸른 바다를 바라보며 마시는 시원한 열대 과일 주스",
      "IMG_4903.JPG": "현수가 푹 빠져버린 달콤한 생 망고스틴 한 바구니!",
      "IMG_2984.jpeg": "빈펄 사파리 아기 코끼리와의 다정한 교감",
      "IMG_3062.jpeg": "기린 레스토랑에서 기린에게 직접 건넨 당근 간식",
      "IMG_3300.jpeg": "푸꾸옥 빈원더스 워터파크에서의 짜릿한 물놀이",
      "IMG_3585.JPEG": "200일 기념 선셋타운 최고급 레스토랑 디너 코스",
      "IMG_3609.JPEG": "붉게 물드는 남국의 노을을 바라보며 나눈 축배",
      "IMG_3645.JPEG": "선셋타운 밤하늘을 수놓은 환상적인 불꽃놀이 쇼",
      "IMG_3664.JPEG": "로맨틱한 조명 아래서 남긴 200일 기념 커플 샷",
      "IMG_6385.JPEG": "섬나라에서 맛본 정통 이탈리안 피자와 파스타",
      "IMG_6391.JPEG": "즈엉동 야시장의 싱싱한 가리비 구이와 해산물 만찬",
      "IMG_4926.JPG": "마사지 샵에서 시원하게 피로를 날려버린 힐링 타임",
      "IMG_4923.JPG": "동남아 감성 물씬 풍기는 푸꾸옥 골목길 산책",
      "IMG_4563.JPG": "리조트 전용 비치와 에메랄드빛 해변 산책로",
      "dji_fly_0_0_0_1721367542267_video_cache.MP4": "🎬 [영상] 사오비치 푸른 물살을 가르는 제트스키 드론 활주",
      "dji_fly_0_0_0_1721367542272_video_cache.mp4": "🎬 [영상] 에메랄드빛 바다 위 짜릿한 제트스키 하이라이트",
      "IMG_7070.MP4": "🎬 [영상] 현슈니의 두근두근 첫 남국 바캉스 기록",
      "IMG_7186.JPEG": "눈부시게 아름다웠던 풀빌라 숙소와 정원의 마지막 아침"
    };

    var result = [];
    for (var name in phuquocPhotos) {
      if (!phuquocPhotos.hasOwnProperty(name)) continue;
      var isVid = /\.(mp4|mov)$/i.test(name);
      result.push({
        type: isVid ? "video" : "image",
        url: PHUQUOC_BASE + name,
        caption: phuquocPhotos[name],
        name: name
      });
    }
    return result;
  })()
});
