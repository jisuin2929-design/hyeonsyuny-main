// ============================================================
// 📜 The Daily Prophet - Main Newspaper Script
// ============================================================

// 1. 고속도로 일지 타임라인 데이터 (GEMINI.md 규격)
const highwayTimelineEntries = [
  { date: "YYYY.MM.DD", title: "첫 번째 기록", description: "이곳에 첫 번째 여행 기록을 한두 줄로 적어 주세요.", image: "images/고속도로일지/타임라인/01.jpg" },
  { date: "YYYY.MM.DD", title: "두 번째 기록", description: "이곳에 두 번째 여행 기록을 한두 줄로 적어 주세요.", image: "images/고속도로일지/타임라인/02.jpg" },
  { date: "YYYY.MM.DD", title: "세 번째 기록", description: "이곳에 세 번째 여행 기록을 한두 줄로 적어 주세요.", image: "images/고속도로일지/타임라인/03.jpg" }
];

// 타임라인 DOM 요소가 있을 경우에만 안전하게 초기화
const highwayTimelineTrack = document.getElementById("highwayTimelineTrack");
const highwayTimelineModal = document.getElementById("highwayTimelineModal");
const highwayTimelineModalImage = document.getElementById("highwayTimelineModalImage");
const highwayTimelineImageFallback = document.getElementById("highwayTimelineImageFallback");
let highwayTimelineTrigger = null;

function closeHighwayTimelineModal() {
  if (!highwayTimelineModal) return;
  highwayTimelineModal.classList.add("hidden");
  highwayTimelineModal.classList.remove("flex");
  highwayTimelineModalImage?.removeAttribute("src");
  highwayTimelineTrigger?.focus();
}

function openHighwayTimelineModal(entry, trigger) {
  if (!highwayTimelineModal || !highwayTimelineModalImage) return;
  highwayTimelineTrigger = trigger;
  const dateEl = document.getElementById("highwayTimelineModalDate");
  const titleEl = document.getElementById("highwayTimelineModalTitle");
  const descEl = document.getElementById("highwayTimelineModalDescription");
  if (dateEl) dateEl.textContent = entry.date;
  if (titleEl) titleEl.textContent = entry.title;
  if (descEl) descEl.textContent = entry.description;

  highwayTimelineModalImage.alt = entry.title + " 사진";
  highwayTimelineModalImage.classList.add("hidden");
  highwayTimelineImageFallback?.classList.remove("hidden");
  highwayTimelineModalImage.src = entry.image;
  highwayTimelineModal.classList.remove("hidden");
  highwayTimelineModal.classList.add("flex");
  document.getElementById("highwayTimelineModalClose")?.focus();
}

if (highwayTimelineModalImage) {
  highwayTimelineModalImage.addEventListener("load", () => {
    highwayTimelineModalImage.classList.remove("hidden");
    highwayTimelineImageFallback?.classList.add("hidden");
  });
  highwayTimelineModalImage.addEventListener("error", () => {
    highwayTimelineModalImage.classList.add("hidden");
    highwayTimelineImageFallback?.classList.remove("hidden");
  });
}

if (highwayTimelineTrack) {
  highwayTimelineEntries.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "w-72 shrink-0 snap-start";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "w-full text-left flex flex-col items-start group focus:outline-none";
    button.setAttribute("aria-label", `${entry.date} ${entry.title} 사진과 설명 보기`);
    const date = document.createElement("span");
    date.className = "font-mono text-xs font-bold text-ink-crimson";
    date.textContent = entry.date;
    const dot = document.createElement("span");
    dot.className = "relative z-10 mt-4 mb-3 w-4 h-4 rounded-full bg-ink-crimson border-2 border-parchment-50 ring-2 ring-ink-crimson group-hover:scale-125 group-focus:scale-125 transition-transform";
    dot.setAttribute("aria-hidden", "true");
    const title = document.createElement("span");
    title.className = "w-full min-h-16 p-3 bg-[#f5ebd6] border border-ink/30 font-headline font-bold text-sm text-ink group-hover:border-ink-crimson group-focus:border-ink-crimson group-focus:ring-2 group-focus:ring-ink-crimson";
    title.textContent = entry.title;
    button.append(date, dot, title);
    button.addEventListener("click", () => openHighwayTimelineModal(entry, button));
    item.appendChild(button);
    highwayTimelineTrack.appendChild(item);
  });

  document.getElementById("highwayTimelineModalClose")?.addEventListener("click", closeHighwayTimelineModal);
  highwayTimelineModal?.addEventListener("click", (event) => {
    if (event.target === highwayTimelineModal) closeHighwayTimelineModal();
  });
  highwayTimelineModal?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeHighwayTimelineModal();
    if (event.key === "Tab") {
      event.preventDefault();
      document.getElementById("highwayTimelineModalClose")?.focus();
    }
  });
}

// -------------------------------------------------------------
// 2. Web Audio Synthesizer (외부 오디오 의존 없는 순수 사운드 생성)
// -------------------------------------------------------------
let audioCtx = null;
let isSoundOn = true;
let cachedNoiseBuffer = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 종이 바스락 소리
function playRustlePageSound() {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioCtx();
    if (!cachedNoiseBuffer) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.15);
      cachedNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = cachedNoiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    const noise = ctx.createBufferSource();
    noise.buffer = cachedNoiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(2, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

// 루모스 주문 효과음 (바람 + 크리스탈 벨)
function playLumosSpellSound() {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    const bufferSize = Math.floor(ctx.sampleRate * 0.22);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + 0.16);
    filter.Q.setValueAtTime(3, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start(now);

    const freqs = [523.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const startTime = now + 0.04 + idx * 0.055;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.1, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.58);
    });
  } catch (e) {}
}

// 녹스 주문 효과음 (불꽃 꺼지는 하강 톤)
function playNoxSpellSound() {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const freqs = [1046.50, 783.99, 659.25, 440.00];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const startTime = now + idx * 0.06;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.38);
    });
  } catch (e) {}
}

// 플레이리스트 차임벨 효과음
function playMusicChime() {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.35);
    });
  } catch (e) {}
}

// -------------------------------------------------------------
// 3. 커스텀 알림 메시지 모달
// -------------------------------------------------------------
function showMessageBox(text, icon = "🪄") {
  const msgModal = document.getElementById("msgModal");
  const msgModalText = document.getElementById("msgModalText");
  const msgModalIcon = document.getElementById("msgModalIcon");
  if (msgModal && msgModalText) {
    msgModalText.textContent = text;
    if (msgModalIcon) msgModalIcon.textContent = icon;
    msgModal.classList.remove("hidden");
  }
}

document.getElementById("msgModalCloseBtn")?.addEventListener("click", () => {
  document.getElementById("msgModal")?.classList.add("hidden");
});

// -------------------------------------------------------------
// 4. 사운드 토글 & 지도 iframe 전체화면 토글
// -------------------------------------------------------------
const mapSoundBtn = document.getElementById("mapSoundBtn");
const mapSoundLabel = document.getElementById("mapSoundLabel");
if (mapSoundBtn) {
  mapSoundBtn.addEventListener("click", () => {
    isSoundOn = !isSoundOn;
    if (mapSoundLabel) mapSoundLabel.textContent = isSoundOn ? "마법 음향 ON" : "마법 음향 OFF";
    mapSoundBtn.classList.toggle("opacity-60", !isSoundOn);
    if (isSoundOn) playLumosSpellSound();
    const mapFrame = document.getElementById("maraudersMapFrame");
    if (mapFrame && mapFrame.contentWindow) {
      try {
        mapFrame.contentWindow.postMessage({ type: "MAP_SOUND_TOGGLE", isSoundOn }, "*");
      } catch (e) {}
    }
  });
}

const toggleMapFullscreenBtn = document.getElementById("toggleMapFullscreenBtn");
const mapIframeWrapper = document.getElementById("mapIframeWrapper");
const mapFsLabel = document.getElementById("mapFsLabel");
let isMapFs = false;

if (toggleMapFullscreenBtn && mapIframeWrapper) {
  toggleMapFullscreenBtn.addEventListener("click", () => {
    isMapFs = !isMapFs;
    playLumosSpellSound();
    if (isMapFs) {
      mapIframeWrapper.classList.add("fixed", "inset-2", "z-50", "!max-h-none", "!min-h-0", "shadow-[0_0_80px_rgba(0,0,0,0.95)]");
      if (mapFsLabel) mapFsLabel.textContent = "신문 크기로 축소";
      toggleMapFullscreenBtn.classList.add("bg-ink-crimson");
      document.body.style.overflow = "hidden";
    } else {
      mapIframeWrapper.classList.remove("fixed", "inset-2", "z-50", "!max-h-none", "!min-h-0", "shadow-[0_0_80px_rgba(0,0,0,0.95)]");
      if (mapFsLabel) mapFsLabel.textContent = "전체화면 확대";
      toggleMapFullscreenBtn.classList.remove("bg-ink-crimson");
      document.body.style.overflow = "";
    }
  });
}

// -------------------------------------------------------------
// 5. 1000일 양피지 달력 & 편지함 모달 (Lumos Interaction)
// -------------------------------------------------------------
const calendarCards = document.querySelectorAll(".calendar-card");
const calendarModal = document.getElementById("calendarModal");
const calModalCard = document.getElementById("calModalCard");
const calDarkVeil = document.getElementById("calDarkVeil");
const lumosFlashEffect = document.getElementById("lumosFlashEffect");
const calModalLetterBox = document.getElementById("calModalLetterBox");
const calModalTitle = document.getElementById("calModalTitle");
const calModalDateTag = document.getElementById("calModalDateTag");
const calModalImage = document.getElementById("calModalImage");
const calModalLetterText = document.getElementById("calModalLetterText");
const closeCalendarModalBtn = document.getElementById("closeCalendarModalBtn");
const closeCalModalDarkBtn = document.getElementById("closeCalModalDarkBtn");
const confirmCalendarModalBtn = document.getElementById("confirmCalendarModalBtn");
const calToggleNoxBtn = document.getElementById("calToggleNoxBtn");

let isLumosLit = false;

function resetLumosToDark() {
  isLumosLit = false;
  if (calDarkVeil) {
    calDarkVeil.classList.remove("opacity-0", "pointer-events-none", "scale-105");
    calDarkVeil.classList.add("opacity-100", "pointer-events-auto", "scale-100");
  }
  if (calModalCard) {
    calModalCard.classList.remove("lumos-card-lit");
  }
  if (calModalLetterBox) {
    calModalLetterBox.classList.remove("letter-ink-emerge");
  }
}

function castLumosSpell() {
  if (isLumosLit) return;
  isLumosLit = true;

  playLumosSpellSound();

  if (navigator.vibrate) {
    try { navigator.vibrate(40); } catch (e) {}
  }

  if (lumosFlashEffect) {
    lumosFlashEffect.classList.remove("lumos-flash-active");
    void lumosFlashEffect.offsetWidth;
    lumosFlashEffect.classList.add("lumos-flash-active");
    setTimeout(() => {
      lumosFlashEffect.classList.remove("lumos-flash-active");
    }, 900);
  }

  if (calDarkVeil) {
    calDarkVeil.classList.remove("opacity-100", "pointer-events-auto", "scale-100");
    calDarkVeil.classList.add("opacity-0", "pointer-events-none", "scale-105");
  }

  if (calModalCard) {
    calModalCard.classList.add("lumos-card-lit");
  }
  if (calModalLetterBox) {
    setTimeout(() => {
      calModalLetterBox.classList.add("letter-ink-emerge");
    }, 150);
  }
}

function castNoxSpell() {
  if (!isLumosLit) return;
  playNoxSpellSound();
  resetLumosToDark();
}

calendarCards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title") || "마법의 순간";
    const date = card.getAttribute("data-date") || "1000 DAYS";
    const img = card.getAttribute("data-img") || "";
    const letter = card.getAttribute("data-letter") || "";

    if (calModalTitle) calModalTitle.textContent = title;
    if (calModalDateTag) calModalDateTag.textContent = date;
    if (calModalImage) calModalImage.src = img;
    if (calModalLetterText) calModalLetterText.textContent = letter;

    resetLumosToDark();
    playRustlePageSound();
    if (calendarModal) {
      calendarModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  });
});

if (calDarkVeil) {
  calDarkVeil.addEventListener("click", (e) => {
    if (e.target === closeCalModalDarkBtn || closeCalModalDarkBtn?.contains(e.target)) return;
    castLumosSpell();
  });
}

if (calToggleNoxBtn) {
  calToggleNoxBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    castNoxSpell();
  });
}

const closeCalModal = () => {
  if (calendarModal) {
    calendarModal.classList.add("hidden");
    document.body.style.overflow = "";
  }
  playNoxSpellSound();
  resetLumosToDark();
};

if (closeCalendarModalBtn) closeCalendarModalBtn.addEventListener("click", closeCalModal);
if (closeCalModalDarkBtn) closeCalModalDarkBtn.addEventListener("click", closeCalModal);
if (confirmCalendarModalBtn) confirmCalendarModalBtn.addEventListener("click", closeCalModal);

calendarModal?.addEventListener("click", (e) => {
  if (e.target === calendarModal) {
    closeCalModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && calendarModal && !calendarModal.classList.contains("hidden")) {
    closeCalModal();
  }
});

// -------------------------------------------------------------
// 6. 설원행 심야 드라이브 플레이리스트 인터랙션
// -------------------------------------------------------------
const playlistPlayBtn = document.getElementById("playlistPlayBtn");
const playlistPlayIcon = document.getElementById("playlistPlayIcon");
const playlistStatusBadge = document.getElementById("playlistStatusBadge");
const currentTrackIndex = document.getElementById("currentTrackIndex");
const currentTrackTitle = document.getElementById("currentTrackTitle");
const currentTrackTime = document.getElementById("currentTrackTime");
const playlistProgressBar = document.getElementById("playlistProgressBar");
const playlistTrackItems = document.querySelectorAll(".playlist-track-item");

let isPlaylistPlaying = false;

playlistTrackItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    playlistTrackItems.forEach(b => {
      b.classList.remove("ring-1", "ring-ink-crimson/50", "bg-[#ebd9b4]");
      b.classList.add("bg-[#f5ebd6]");
    });
    btn.classList.add("ring-1", "ring-ink-crimson/50", "bg-[#ebd9b4]");
    btn.classList.remove("bg-[#f5ebd6]");

    const idx = btn.getAttribute("data-track-index");
    const title = btn.getAttribute("data-title");
    const duration = btn.getAttribute("data-duration");
    const current = btn.getAttribute("data-current") || "00:00";
    const progress = btn.getAttribute("data-progress") || "0";

    if (currentTrackIndex) currentTrackIndex.textContent = `TRACK 0${idx}`;
    if (currentTrackTitle) currentTrackTitle.textContent = title;
    if (currentTrackTime) currentTrackTime.textContent = `${current} / ${duration}`;
    if (playlistProgressBar) playlistProgressBar.style.width = `${progress}%`;

    playMusicChime();
  });
});

playlistPlayBtn?.addEventListener("click", () => {
  isPlaylistPlaying = !isPlaylistPlaying;
  if (isPlaylistPlaying) {
    playlistPlayIcon?.classList.remove("fa-play");
    playlistPlayIcon?.classList.add("fa-pause");
    if (playlistStatusBadge) {
      playlistStatusBadge.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span><span>PLAYING NOW</span>`;
      playlistStatusBadge.className = "text-[11px] font-mono text-emerald-800 font-bold flex items-center gap-1";
    }
    playMusicChime();
  } else {
    playlistPlayIcon?.classList.remove("fa-pause");
    playlistPlayIcon?.classList.add("fa-play");
    if (playlistStatusBadge) {
      playlistStatusBadge.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span><span>PAUSED</span>`;
      playlistStatusBadge.className = "text-[11px] font-mono text-amber-800 font-bold flex items-center gap-1";
    }
  }
});

// -------------------------------------------------------------
// 7. O.W.L. Interactive Quiz (커플 맞춤형 4문항)
// -------------------------------------------------------------
const quizQuestions = [
  {
    q: "1. 스키장에서 넘어진 상대를 구하는 가장 올바른 마법 주문은?",
    options: [
      "“아씨오 핫초코!” 주문으로 따뜻한 음료 대령하기",
      "혼자 일어날 때까지 기다리며 스마트폰으로 웃긴 영상 찍기",
      "손잡아 일으켜 세워주고 엉덩이 눈 털어주며 안아주기",
      "“밑에서 만나자!”며 혼자 슈웅 날아가기"
    ],
    ans: 2
  },
  {
    q: "2. 하이디라오 훠궈 집에서 영혼을 지키는 가장 완벽한 대처법은?",
    options: [
      "다이어트해야하니까 채소만 시키기",
      "강해천소스 황금 비율로 듬뿍 제조하고 고기랑 완자랑 잔뜩 시켜서 배 터지게 먹기",
      "마라탕 매운맛 최고 단계 먹고 땀 흘리며 울기",
      "수타면 쇼 구경만 하고 면은 안 먹기"
    ],
    ans: 1
  },
  {
    q: "3. 두니가 '보고 싶다'고 메신저로 연속 20번 도배할 때 현수의 모범 대처는?",
    options: [
      "알림 끄고 모른 척 알렌의 서재 켜기",
      "“나도 지금 보고 싶어 사랑해” 답장하고 하트 날리기",
      "“수인아 집착이 심하다”며 아즈카반 판결문 캡처해 보내기",
      "읽고 1시간 뒤에 'ㅇㅇ' 보내기"
    ],
    ans: 1
  },
  {
    q: "4. 앞으로 남은 100년의 사랑 공동 종신형 동안 가장 중요한 규칙은?",
    options: [
      "공복 상태에서 절대 싸우지 말고 달달구리한 맛있는 거부터 입에 넣기",
      "스키장에서 두니버리고 혼자 빠르게 내려가기",
      "불리할 때마다 기억상실증 연기하면서 헬스장으로 도망가기",
      "‘누나’라고 안부르고 평생 능글거리기"
    ],
    ans: 0
  }
];

let quizScore = 0;
const answeredMap = {};

function renderQuiz() {
  const container = document.getElementById("quizContainer");
  if (!container) return;
  container.innerHTML = "";

  quizQuestions.forEach((item, qIdx) => {
    const qBox = document.createElement("div");
    qBox.className = "bg-parchment-50 p-2.5 sm:p-3 border border-ink shadow-xs";

    const qTitle = document.createElement("h5");
    qTitle.className = "font-bold text-ink mb-1.5 text-xs";
    qTitle.textContent = item.q;
    qBox.appendChild(qTitle);

    const optList = document.createElement("div");
    optList.className = "space-y-1";

    item.options.forEach((optText, oIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "w-full text-left p-1.5 bg-[#fbf5e8] hover:bg-[#ebd9b4] border border-ink/30 rounded-xs text-xs font-medium transition cursor-pointer";
      btn.textContent = `${oIdx + 1}) ${optText}`;

      btn.addEventListener("click", () => {
        if (answeredMap[qIdx] !== undefined) return;
        answeredMap[qIdx] = oIdx;

        if (oIdx === item.ans) {
          btn.className = "w-full text-left p-1.5 bg-[#d4edda] text-[#155724] border border-[#28a745] font-bold rounded-xs text-xs";
          quizScore += 1;
          playLumosSpellSound();
        } else {
          btn.className = "w-full text-left p-1.5 bg-[#f8d7da] text-[#721c24] border border-[#dc3545] font-bold rounded-xs text-xs";
          playRustlePageSound();
        }

        const badge = document.getElementById("quizScoreBadge");
        if (badge) badge.textContent = `점수: ${quizScore} / ${quizQuestions.length}`;

        if (Object.keys(answeredMap).length === quizQuestions.length) {
          if (quizScore >= 3) {
            showMessageBox("🎉 O.W.L. 시험 최고 등급 [O: 특출함(Outstanding)] 획득! 1000일간 다져진 완벽한 파트너입니다!", "🏆");
          } else {
            showMessageBox("성적표: [A: 기대 이하]! 수인 누나에게 더 많은 맛있는 간식과 애정 표현이 시급합니다!", "📜");
          }
        }
      });

      optList.appendChild(btn);
    });

    qBox.appendChild(optList);
    container.appendChild(qBox);
  });
}

// -------------------------------------------------------------
// 8. Crossword Puzzle Check (낱말 퍼즐 검증)
// -------------------------------------------------------------
const checkCrosswordBtn = document.getElementById("checkCrosswordBtn");
const cwSuccessBox = document.getElementById("cwSuccessBox");

if (checkCrosswordBtn) {
  checkCrosswordBtn.addEventListener("click", () => {
    const c1 = (document.getElementById("cw1")?.value || "").trim();
    const c2 = (document.getElementById("cw2")?.value || "").trim();
    const c3 = (document.getElementById("cw3")?.value || "").trim();
    const c4 = (document.getElementById("cw4")?.value || "").trim();

    const isC1 = c1.includes("스키장") || c1.includes("슬로프");
    const isC2 = c2.includes("디저트") || c2.includes("빵집") || c2.includes("카페");
    const isC3 = c3.includes("스노우보드") || c3.includes("스노보드");
    const isC4 = c4 === "1000" || c4 === "천";

    if (isC1 && isC2 && isC3 && isC4) {
      playLumosSpellSound();
      if (cwSuccessBox) cwSuccessBox.classList.remove("hidden");
      showMessageBox("✨ 낱말 퍼즐 완벽 정답! 수인이의 1000일 마법 메시지가 해금되었습니다!", "👑");
    } else {
      playRustlePageSound();
      showMessageBox("다시 한번 지혜를 모아보세요! (힌트: 스키장 / 디저트 / 스노우보드 / 1000)", "💡");
    }
  });
}

// -------------------------------------------------------------
// 9. Gringotts Vault Passcode (그린고츠 비밀 금고)
// -------------------------------------------------------------
const openVaultBtn = document.getElementById("openVaultBtn");
const vaultPasscode = document.getElementById("vaultPasscode");
const vaultModal = document.getElementById("vaultModal");
const closeVaultModalBtn = document.getElementById("closeVaultModalBtn");
const confirmVaultBtn = document.getElementById("confirmVaultBtn");
const vaultDial = document.getElementById("vaultDial");

if (openVaultBtn && vaultPasscode) {
  openVaultBtn.addEventListener("click", () => {
    const val = vaultPasscode.value.trim();
    if (val === "1000") {
      playLumosSpellSound();
      if (vaultDial) vaultDial.style.transform = "rotate(360deg)";
      setTimeout(() => {
        if (vaultModal) vaultModal.classList.remove("hidden");
      }, 350);
    } else {
      playRustlePageSound();
      showMessageBox("알로호모라 실패! 암호가 틀립니다. (힌트: 오늘 우리가 기념하는 날짜의 수)", "🔒");
    }
  });

  vaultPasscode.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openVaultBtn.click();
  });
}

const closeVault = () => {
  if (vaultModal) vaultModal.classList.add("hidden");
  playRustlePageSound();
};

if (closeVaultModalBtn) closeVaultModalBtn.addEventListener("click", closeVault);
if (confirmVaultBtn) confirmVaultBtn.addEventListener("click", closeVault);

// -------------------------------------------------------------
// 10. 마법 초상화 동영상 재생 속도 (0.8배속) 설정
// -------------------------------------------------------------
const mainPortraitVid = document.getElementById("mainMovingPortraitVideo");
if (mainPortraitVid) {
  const applySlowPlayback = () => {
    mainPortraitVid.playbackRate = 0.8;
  };
  mainPortraitVid.addEventListener("loadedmetadata", applySlowPlayback);
  mainPortraitVid.addEventListener("play", applySlowPlayback);
  applySlowPlayback();
}

// 버튼 및 링크 클릭 시 은은한 종이 바스락 효과음
document.addEventListener("click", (e) => {
  if (e.target.closest("button") || e.target.closest("a")) {
    playRustlePageSound();
  }
});

// 초기화
window.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
});
