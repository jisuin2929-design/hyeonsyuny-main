# 작업 안내

이 저장소는 빌드 과정이 없는 GitHub Pages용 정적 웹사이트입니다. 발행 소스는 저장소 루트이며 `index.html`이 첫 화면, `map.html`이 지도 화면입니다. HTML, CSS, JavaScript, 이미지의 상대 경로를 유지하세요.

## 파일 위치

| 작업 대상 | 파일 |
| --- | --- |
| 신문 본문과 화면 구조 | `index.html` |
| 신문 스타일과 동작 | `assets/css/index.css`, `assets/js/index.js` |
| 신문 Tailwind 테마 | `assets/js/index-tailwind.js` |
| 지도 화면 구조 | `map.html` |
| 지도 스타일과 동작 | `assets/css/map.css`, `assets/js/map.js` |
| 지도 여행지·기본 사진 데이터 | `assets/js/map-data.js` |
| 지도 Tailwind 테마 | `assets/js/map-tailwind.js` |
| 사진 | `images/메인페이지/`, `images/여행지/<여행지>/`, `images/고속도로일지/타임라인/` |

큰 파일 전체를 읽기 전에 `rg -n '<검색어>' index.html map.html assets`로 관련 위치를 찾으세요. 여행지와 사진을 바꿀 때는 `map-data.js`, 지도 기능을 바꿀 때는 `map.js`를 우선 확인하세요.

## 로딩 순서와 편집 규칙

- 두 HTML은 Tailwind CDN 다음에 각 페이지의 `*-tailwind.js`를 일반 스크립트로 불러옵니다. 순서를 바꾸지 마세요.
- `map.html`은 D3·TopoJSON을 먼저, `map-data.js`를 다음, `map.js`를 마지막에 불러옵니다. 지도 로직은 `DOMESTIC_SPOTS`와 `OVERSEAS_SPOTS`를 참조합니다.
- CSS와 JS는 페이지별 파일을 수정하세요. HTML에 큰 `<style>`·`<script>` 블록을 다시 넣지 마세요.
- 고속도로 타임라인 기록은 `assets/js/index.js`의 `highwayTimelineEntries` 배열에 있습니다. 각 항목은 `date`, `title`, `description`, `image`를 갖습니다. 현재 세 항목은 `YYYY.MM.DD` 예시이므로 실제 기록과 사진을 받으면 교체하세요.
- 타임라인 사진의 `image` 값은 루트 HTML 기준 상대 경로입니다. 예: `images/고속도로일지/타임라인/01.jpg`.
- 지도 갤러리의 기본 사진은 `map-data.js`의 여행지별 `photos` 배열에서 표시합니다. 사진을 `images/여행지/`에 넣은 뒤 해당 `url`도 바꿔야 공개 페이지에 반영됩니다.

## 확인할 점

- GitHub Pages에서는 루트 브랜치의 `/(root)`를 발행 소스로 선택합니다. 새 CSS·JS 파일도 HTML과 함께 커밋해야 합니다.
- 지도의 화면 내 사진 업로드는 브라우저 IndexedDB에 저장됩니다. 방문자 간 공유나 GitHub 저장소 커밋 기능이 아닙니다.
- 지도 관리자 암구호는 클라이언트 코드에 있어 공개 페이지의 접근 통제 수단이 아닙니다.
- 변경 후 JS 문법, HTML의 상대 경로, 메인·지도 화면, 타임라인 가로 스크롤과 팝업을 확인하세요. 정적 검사와 실제 브라우저 검증 결과는 구분해 보고하세요.
