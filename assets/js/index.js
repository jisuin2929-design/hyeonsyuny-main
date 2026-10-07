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
// 2. Web Audio Synthesizer (효과음 전용)
// -------------------------------------------------------------
let audioCtx = null;
let isSoundOn = true;
let cachedNoiseBuffer = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
}

// -------------------------------------------------------------
// 2.5 해리포터 오프닝 테마 BGM (hedwig's theme.mp3 오디오 플레이어)
// -------------------------------------------------------------
const BGM_SRC = "images/메인페이지/hedwig's%20theme.mp3";
let bgmAudio = document.getElementById("mainBgmAudio");
if (!bgmAudio) {
  bgmAudio = new Audio(BGM_SRC);
  bgmAudio.id = "mainBgmAudio";
  bgmAudio.loop = true;
  bgmAudio.preload = "auto";
  document.body.appendChild(bgmAudio);
} else {
  bgmAudio.loop = true;
}
bgmAudio.volume = 0.45;

// 해리포터 테마곡 재생
function startBgm() {
  if (!bgmAudio) return;

  // 플레이리스트 곡이 재생 중이었다면 충돌 방지를 위해 일시정지
  if (typeof isPlaylistPlaying !== "undefined" && isPlaylistPlaying && typeof pausePlaylistTrack === "function") {
    pausePlaylistTrack();
  }

  const playPromise = bgmAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isSoundOn = true;
      updateSoundUI(true);
    }).catch((err) => {
      console.log("BGM 자동재생 대기 (사용자 첫 터치/클릭 시 자동 시작):", err);
    });
  }
}

// 해리포터 테마곡 정지
function stopBgm() {
  if (!bgmAudio) return;
  bgmAudio.pause();
  isSoundOn = false;
  updateSoundUI(false);
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
const mapSoundIcon = document.getElementById("mapSoundIcon");

const floatingBgmBtn = document.getElementById("floatingBgmBtn");
const floatingBgmLabel = document.getElementById("floatingBgmLabel");
const floatingBgmIcon = document.getElementById("floatingBgmIcon");
const floatingBgmIndicator = document.getElementById("floatingBgmIndicator");

function updateSoundUI(isOn) {
  if (mapSoundLabel) mapSoundLabel.textContent = isOn ? "마법 BGM 정지" : "마법 BGM 재생";
  if (mapSoundBtn) mapSoundBtn.classList.toggle("opacity-60", !isOn);
  if (mapSoundIcon) mapSoundIcon.textContent = isOn ? "🎵" : "🔇";

  if (floatingBgmLabel) floatingBgmLabel.textContent = isOn ? "마법 BGM 정지" : "마법 BGM 재생";
  if (floatingBgmBtn) {
    floatingBgmBtn.classList.toggle("opacity-70", !isOn);
    floatingBgmBtn.classList.toggle("border-amber-600/80", isOn);
    floatingBgmBtn.classList.toggle("border-ink/50", !isOn);
  }
  if (floatingBgmIcon) {
    floatingBgmIcon.style.animationPlayState = isOn ? "running" : "paused";
  }
  if (floatingBgmIndicator) {
    floatingBgmIndicator.className = isOn
      ? "inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
      : "inline-block w-2 h-2 rounded-full bg-amber-700";
  }
}

function toggleSoundState() {
  if (!bgmAudio) {
    bgmAudio = document.getElementById("mainBgmAudio") || new Audio(BGM_SRC);
  }

  if (bgmAudio.paused) {
    startBgm();
    playMusicChime();
  } else {
    stopBgm();
  }

  const mapFrame = document.getElementById("maraudersMapFrame");
  if (mapFrame && mapFrame.contentWindow) {
    try {
      mapFrame.contentWindow.postMessage({ type: "MAP_SOUND_TOGGLE", isSoundOn }, "*");
    } catch (e) { }
  }
}

if (mapSoundBtn) mapSoundBtn.addEventListener("click", toggleSoundState);
if (floatingBgmBtn) floatingBgmBtn.addEventListener("click", toggleSoundState);

// 페이지 접속 시 즉시 자동재생 시도 & 브라우저 제스처 해제 리스너
function tryAutoplayHedwig() {
  startBgm();
}

function unlockOnFirstGesture() {
  if (bgmAudio && bgmAudio.paused && isSoundOn) {
    startBgm();
  }
  const ctx = getAudioCtx();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => { });
  }
}

["click", "touchstart", "scroll", "keydown", "pointerdown"].forEach((evt) => {
  window.addEventListener(evt, unlockOnFirstGesture, { once: true, passive: true });
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", tryAutoplayHedwig);
} else {
  tryAutoplayHedwig();
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
    try { navigator.vibrate(40); } catch (e) { }
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
// 6. 설원행 심야 드라이브 플레이리스트 인터랙션 (실제 음악 오디오 연동)
// -------------------------------------------------------------
const playlistPlayBtn = document.getElementById("playlistPlayBtn");
const playlistPlayIcon = document.getElementById("playlistPlayIcon");
const playlistStatusBadge = document.getElementById("playlistStatusBadge");
const currentTrackIndex = document.getElementById("currentTrackIndex");
const currentTrackTitle = document.getElementById("currentTrackTitle");
const currentTrackTime = document.getElementById("currentTrackTime");
const playlistProgressBar = document.getElementById("playlistProgressBar");
const playlistTrackItems = document.querySelectorAll(".playlist-track-item");
const playlistPlayerContainer = document.getElementById("playlistPlayerContainer");
const playlistIframe = document.getElementById("playlistIframe");

let currentActiveTrackBtn = playlistTrackItems[0] || null;
let isPlaylistPlaying = false;
let playlistProgressTimer = null;
let currentTrackSeconds = 0;

function parseDurationToSeconds(str) {
  if (!str) return 240;
  const parts = str.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 240;
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

function startPlaylistProgress(totalDurationStr) {
  if (playlistProgressTimer) clearInterval(playlistProgressTimer);
  const totalSec = parseDurationToSeconds(totalDurationStr);
  currentTrackSeconds = 0;

  playlistProgressTimer = setInterval(() => {
    if (!isPlaylistPlaying) return;
    currentTrackSeconds += 1;
    if (currentTrackSeconds > totalSec) {
      currentTrackSeconds = 0;
    }
    const percent = Math.min((currentTrackSeconds / totalSec) * 100, 100);
    if (playlistProgressBar) playlistProgressBar.style.width = `${percent}%`;
    if (currentTrackTime) currentTrackTime.textContent = `${formatSeconds(currentTrackSeconds)} / ${totalDurationStr}`;
  }, 1000);
}

function playTrack(btn) {
  if (!btn) return;
  currentActiveTrackBtn = btn;

  playlistTrackItems.forEach(b => {
    b.classList.remove("ring-1", "ring-ink-crimson/50", "bg-[#ebd9b4]");
    b.classList.add("bg-[#f5ebd6]");
  });
  btn.classList.add("ring-1", "ring-ink-crimson/50", "bg-[#ebd9b4]");
  btn.classList.remove("bg-[#f5ebd6]");

  const idx = btn.getAttribute("data-track-index");
  const title = btn.getAttribute("data-title");
  const duration = btn.getAttribute("data-duration") || "04:00";
  const ytId = btn.getAttribute("data-yt");

  if (currentTrackIndex) currentTrackIndex.textContent = `TRACK 0${idx}`;
  if (currentTrackTitle) currentTrackTitle.textContent = title;
  if (currentTrackTime) currentTrackTime.textContent = `00:00 / ${duration}`;
  if (playlistProgressBar) playlistProgressBar.style.width = `0%`;

  // 1. 실제 음악 오디오 영상 스트림 로드 & 재생
  if (playlistIframe && ytId) {
    if (playlistPlayerContainer) playlistPlayerContainer.classList.remove("hidden");
    playlistIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&enablejsapi=1`;
  }

  // 2. 배경 마법 BGM(Hedwig's Theme MP3)은 노래와 겹치지 않도록 자동 일시정지
  if (bgmAudio && !bgmAudio.paused) {
    stopBgm();
  }

  // 3. UI 상태 업데이트
  isPlaylistPlaying = true;
  if (playlistPlayIcon) {
    playlistPlayIcon.classList.remove("fa-play");
    playlistPlayIcon.classList.add("fa-pause");
  }
  if (playlistStatusBadge) {
    playlistStatusBadge.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span><span>PLAYING NOW</span>`;
    playlistStatusBadge.className = "text-xs font-mono text-emerald-800 font-bold flex items-center gap-1 shrink-0";
  }

  startPlaylistProgress(duration);
}

function pausePlaylistTrack() {
  isPlaylistPlaying = false;
  if (playlistProgressTimer) clearInterval(playlistProgressTimer);

  if (playlistPlayIcon) {
    playlistPlayIcon.classList.remove("fa-pause");
    playlistPlayIcon.classList.add("fa-play");
  }
  if (playlistStatusBadge) {
    playlistStatusBadge.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span><span>PAUSED</span>`;
    playlistStatusBadge.className = "text-xs font-mono text-amber-800 font-bold flex items-center gap-1 shrink-0";
  }

  if (playlistIframe && playlistIframe.contentWindow) {
    try {
      playlistIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    } catch (e) { }
  }
}

playlistTrackItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    playTrack(btn);
  });
});

playlistPlayBtn?.addEventListener("click", () => {
  if (isPlaylistPlaying) {
    pausePlaylistTrack();
  } else {
    if (currentActiveTrackBtn) {
      playTrack(currentActiveTrackBtn);
    } else if (playlistTrackItems.length > 0) {
      playTrack(playlistTrackItems[0]);
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
    qBox.className = "bg-parchment-50 p-3 sm:p-4 border border-ink shadow-xs";

    const qTitle = document.createElement("h5");
    qTitle.className = "font-bold text-ink mb-2 text-xs sm:text-sm";
    qTitle.textContent = item.q;
    qBox.appendChild(qTitle);

    const optList = document.createElement("div");
    optList.className = "space-y-1.5";

    item.options.forEach((optText, oIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "w-full text-left py-2 px-2.5 bg-[#fbf5e8] hover:bg-[#ebd9b4] border border-ink/30 rounded-xs text-xs sm:text-[13px] font-medium transition cursor-pointer";
      btn.textContent = `${oIdx + 1}) ${optText}`;

      btn.addEventListener("click", () => {
        if (answeredMap[qIdx] !== undefined) return;
        answeredMap[qIdx] = oIdx;

        if (oIdx === item.ans) {
          btn.className = "w-full text-left py-2 px-2.5 bg-[#d4edda] text-[#155724] border border-[#28a745] font-bold rounded-xs text-xs sm:text-[13px]";
          quizScore += 1;
          playLumosSpellSound();
        } else {
          btn.className = "w-full text-left py-2 px-2.5 bg-[#f8d7da] text-[#721c24] border border-[#dc3545] font-bold rounded-xs text-xs sm:text-[13px]";
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
// 8. Crossword Puzzle (가로세로 낱말퍼즐 인터랙티브 로직)
// -------------------------------------------------------------
// -------------------------------------------------------------
// 8. Crossword Puzzle (가로세로 낱말퍼즐 - 실시간 양방향 연동)
// -------------------------------------------------------------
const checkCrosswordBtn = document.getElementById("checkCrosswordBtn");
const resetCrosswordBtn = document.getElementById("resetCrosswordBtn");
const cwSuccessBox = document.getElementById("cwSuccessBox");
const cwBoard = document.getElementById("crosswordBoard");

const cwWord1 = document.getElementById("cwWord1");
const cwWord2 = document.getElementById("cwWord2");
const cwWord3 = document.getElementById("cwWord3");
const cwWord4 = document.getElementById("cwWord4");

function getCwInput(r, c) {
  return document.querySelector(`.cw-input-letter[data-r="${r}"][data-c="${c}"]`);
}

// 1. 우측 입력창 ➔ 좌측 퍼즐판 실시간 반영
function syncWordsToBoard() {
  const w1 = (cwWord1?.value || "").trim();
  const w2 = (cwWord2?.value || "").trim();
  const w3 = (cwWord3?.value || "").trim();
  const w4 = (cwWord4?.value || "").trim();

  // 가로 1: (0,0), (0,1), (0,2)
  const c00 = getCwInput(0, 0);
  const c01 = getCwInput(0, 1);
  const c02 = getCwInput(0, 2);
  if (c00) c00.value = w1[0] || w3[0] || "";
  if (c01) c01.value = w1[1] || "";
  if (c02) c02.value = w1[2] || "";

  // 세로 1: (0,0), (1,0), (2,0), (3,0), (4,0)
  const c10 = getCwInput(1, 0);
  const c20 = getCwInput(2, 0);
  const c30 = getCwInput(3, 0);
  const c40 = getCwInput(4, 0);
  if (c10) c10.value = w3[1] || "";
  if (c20) c20.value = w3[2] || "";
  if (c30) c30.value = w3[3] || "";
  if (c40) c40.value = w3[4] || "";

  // 가로 2: (2,2) ~ (2,6)
  for (let i = 0; i < 5; i++) {
    const cell = getCwInput(2, 2 + i);
    if (cell) cell.value = w2[i] || "";
  }

  // 세로 4: (1,1) ~ (4,1)
  for (let i = 0; i < 4; i++) {
    const cell = getCwInput(1 + i, 1);
    if (cell) cell.value = w4[i] || "";
  }
}

// 2. 좌측 퍼즐판 ➔ 우측 입력창 동기화
function syncBoardToWords() {
  const val = (r, c) => (getCwInput(r, c)?.value || "").trim();

  const w1 = val(0, 0) + val(0, 1) + val(0, 2);
  const w2 = val(2, 2) + val(2, 3) + val(2, 4) + val(2, 5) + val(2, 6);
  const w3 = val(0, 0) + val(1, 0) + val(2, 0) + val(3, 0) + val(4, 0);
  const w4 = val(1, 1) + val(2, 1) + val(3, 1) + val(4, 1);

  if (cwWord1 && w1) cwWord1.value = w1;
  if (cwWord2 && w2) cwWord2.value = w2;
  if (cwWord3 && w3) cwWord3.value = w3;
  if (cwWord4 && w4) cwWord4.value = w4;
}

// 우측 입력창 이벤트 등록 (타이핑 시 퍼즐판 즉시 갱신)
[cwWord1, cwWord2, cwWord3, cwWord4].forEach(input => {
  if (input) {
    input.addEventListener("input", syncWordsToBoard);
    input.addEventListener("compositionend", syncWordsToBoard);
  }
});

// 퍼즐판 타일 클릭 시 우측의 해당 질문 입력창으로 포커스 & 직접 입력 지원
if (cwBoard) {
  const allCwInputs = Array.from(cwBoard.querySelectorAll(".cw-input-letter"));

  allCwInputs.forEach((cellInput) => {
    const r = parseInt(cellInput.dataset.r, 10);
    const c = parseInt(cellInput.dataset.c, 10);

    // 타일 클릭 시 우측 관련 문제 입력창으로 부드럽게 안내
    cellInput.addEventListener("click", () => {
      if (r === 0) {
        cwWord1?.focus();
      } else if (c === 0) {
        cwWord3?.focus();
      } else if (c === 1) {
        cwWord4?.focus();
      } else if (r === 2 && c >= 2) {
        cwWord2?.focus();
      }
    });

    // 타일에서 직접 한 글자 입력 시
    cellInput.addEventListener("input", () => {
      syncBoardToWords();
    });
  });
}

// 지우기(초기화) 버튼
if (resetCrosswordBtn) {
  resetCrosswordBtn.addEventListener("click", () => {
    [cwWord1, cwWord2, cwWord3, cwWord4].forEach(input => {
      if (input) input.value = "";
    });
    document.querySelectorAll(".cw-input-letter").forEach((input) => {
      input.value = "";
    });
    document.querySelectorAll(".cw-cell-active").forEach((cell) => {
      cell.classList.remove("cw-cell-correct");
    });
    if (cwSuccessBox) cwSuccessBox.classList.add("hidden");
    if (cwWord1) cwWord1.focus();
  });
}

// 정답 주문 시전 (검증)
if (checkCrosswordBtn) {
  checkCrosswordBtn.addEventListener("click", () => {
    syncWordsToBoard();

    const val = (r, c) => (getCwInput(r, c)?.value || "").trim();

    const w1Across = (cwWord1?.value || (val(0, 0) + val(0, 1) + val(0, 2))).trim();
    const w2Across = (cwWord2?.value || (val(2, 2) + val(2, 3) + val(2, 4) + val(2, 5) + val(2, 6))).trim();
    const w1Down = (cwWord3?.value || (val(0, 0) + val(1, 0) + val(2, 0) + val(3, 0) + val(4, 0))).trim();
    const w4Down = (cwWord4?.value || (val(1, 1) + val(2, 1) + val(3, 1) + val(4, 1))).trim();

    const isC1 = w1Across === "스키장";
    const isC2 = w2Across === "하이디라오";
    const isC3 = w1Down === "스노우보드" || w1Down === "스노보드";
    const isC4 = w4Down === "1000";

    if (isC1 && isC2 && isC3 && isC4) {
      playLumosSpellSound();
      document.querySelectorAll(".cw-cell-active").forEach((cell) => {
        cell.classList.add("cw-cell-correct");
      });
      if (cwSuccessBox) cwSuccessBox.classList.remove("hidden");
      showMessageBox("✨ 낱말 퍼즐 완벽 정답! 수인이의 1000일 마법 메시지가 해금되었습니다!", "👑");
    } else {
      playRustlePageSound();
      showMessageBox("다시 한번 지혜를 모아보세요! (힌트: 스키장 / 하이디라오 / 스노우보드 / 1000)", "💡");
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

// -------------------------------------------------------------
// 11. 펜시브 기억 저장소 · 패트로누스 수업 · 소망의 거울
// -------------------------------------------------------------
// 펜시브 기억 병 목록
// 새 기억을 넣으려면 아래 배열에 항목을 하나 추가하세요.
//   cat   : 선반 탭 이름 (pensieveCategories 중 하나)
//   icon  : 병 위에 뜨는 이모지
//   label : 병 아래 짧은 이름 (6글자 안팎)
//   date  : 대야 위쪽 작은 글씨 (날짜·D+일수)
//   title : 기억 제목
//   text  : 기억 내용
//   image : (선택) 사진 경로. 예: "images/펜시브/christmas-2024.jpg"
const pensieveCategories = ["기념일", "크리스마스", "발렌타인", "화이트데이", "생일", "졸업·가운", "스키장", "추억 사건"];

const pensieveMemories = [
  // ---------------- 기념일 (D+1 = 2024.01.01) ----------------
  { cat: "기념일", icon: "💯", label: "100일", date: "D+100 · 2024.04.09", title: "부엉이가 물어다 준 100일",
    text: "호그와트 입학 통지서가 도착하듯, 둘만의 세계로 들어가는 문이 활짝 열린 첫 번째 세 자리 숫자의 날." },
  { cat: "기념일", icon: "🚂", label: "200일", date: "D+200 · 2024.07.18", title: "9와 3/4 승강장 통과",
    text: "벽을 향해 달려가면 정말 다른 세상이 열린다는 걸 확인한 200일. 이제 서로의 일상이라는 급행열차에 자연스럽게 함께 타고 있다." },
  { cat: "기념일", icon: "🎩", label: "300일", date: "D+300 · 2024.10.26", title: "분류 모자의 판정",
    text: "모자가 고민할 필요도 없이 외쳤다. \"같은 기숙사!\" 300일 만에 공식적으로 같은 테이블에 앉게 된 두 사람." },
  { cat: "기념일", icon: "🧹", label: "400일", date: "D+400 · 2025.02.03", title: "첫 퀴디치 시즌 완주",
    text: "설원 위 빗자루(스노보드) 시즌을 함께 치러 낸 400일. 수색꾼과 몰이꾼처럼 각자 자리에서 호흡을 맞추는 법을 익혔다." },
  { cat: "기념일", icon: "⏳", label: "500일", date: "D+500 · 2025.05.14", title: "1000일의 딱 절반",
    text: "시간 돌리개를 돌리지 않아도 지나온 길이 반짝이고, 남은 길은 더 기대되는 500일." },
  { cat: "기념일", icon: "🏘️", label: "600일", date: "D+600 · 2025.08.22", title: "허가서 없는 호그스미드",
    text: "보호자 서명 없이도 어디든 함께 놀러 갈 수 있는 사이. 600일째에도 다음 여행지 목록은 계속 길어지는 중." },
  { cat: "기념일", icon: "🍺", label: "700일", date: "D+700 · 2025.11.30", title: "세 개의 빗자루에서 건배",
    text: "따뜻한 버터비어 잔을 부딪치듯 서로를 축하한 700일. 겨울이 오고, 또 둘의 스키 시즌이 시작됐다." },
  { cat: "기념일", icon: "🔥", label: "800일", date: "D+800 · 2026.03.10", title: "불사조의 눈물",
    text: "힘든 날에도 불사조 눈물처럼 서로의 상처를 낫게 해 준 800일. 바빠도 마음만은 늘 가장 가까이에 있었다." },
  { cat: "기념일", icon: "🔮", label: "900일", date: "D+900 · 2026.06.18", title: "완성되어 가는 예언",
    text: "1000일을 향한 예언이 거의 다 쓰인 900일. 마지막 100일 카운트다운이 시작됐다." },
  { cat: "기념일", icon: "✨", label: "1000일", date: "D+1000 · 2026.09.26", title: "그리고 1000일",
    text: "수많은 도시와 설원과 맛집을 지나 도착한 1000번째 날. 이 기억 선반은 아직 반밖에 차지 않았다. 나머지는 다음 1000일이 채울 것이다." },

  // ---------------- 크리스마스 ----------------
  { cat: "크리스마스", icon: "🎄", label: "첫 번째", date: "D-7 · 2023.12.25", title: "첫 번째 크리스마스",
    text: "공식 1일보다 일주일 앞섰던 크리스마스. 마법부 기록에는 아직 없지만 펜시브는 똑똑히 기억한다. 위즐리 부인의 손뜨개 스웨터처럼 포근했던 시작." },
  { cat: "크리스마스", icon: "❄️", label: "두 번째", date: "D+360 · 2024.12.25", title: "두 번째 크리스마스",
    text: "연회장 천장에서 마법 눈이 내리듯, 처음으로 연인으로 맞은 크리스마스는 둘이라서 더 반짝였다." },
  { cat: "크리스마스", icon: "🎁", label: "세 번째", date: "D+725 · 2025.12.25", title: "세 번째 크리스마스",
    text: "세 번째 크리스마스. 이제 서로의 선물 취향쯤은 레질리먼시 없이도 다 안다." },

  // ---------------- 발렌타인데이 ----------------
  { cat: "발렌타인", icon: "💝", label: "첫 번째", date: "D+45 · 2024.02.14", title: "첫 번째 발렌타인",
    text: "록허트가 큐피드 난쟁이를 풀어놓았던 그날처럼 온 세상이 분홍빛이던 첫 발렌타인. 만난 지 겨우 45일째였다." },
  { cat: "발렌타인", icon: "🍫", label: "두 번째", date: "D+411 · 2025.02.14", title: "두 번째 발렌타인",
    text: "아모텐시아보다 달콤한 초콜릿 한 상자. 두 번째라 덜 떨릴 줄 알았는데 여전히 설렜다." },
  { cat: "발렌타인", icon: "💌", label: "세 번째", date: "D+776 · 2026.02.14", title: "세 번째 발렌타인",
    text: "노래하는 발렌타인 카드 대신, 진심을 꾹꾹 눌러 담은 세 번째 발렌타인." },

  // ---------------- 화이트데이 ----------------
  { cat: "화이트데이", icon: "🍬", label: "첫 번째", date: "D+74 · 2024.03.14", title: "첫 번째 화이트데이",
    text: "허니듀크 사탕 진열대를 통째로 옮겨 온 듯 달콤했던 첫 화이트데이." },
  { cat: "화이트데이", icon: "🍭", label: "두 번째", date: "D+439 · 2025.03.14", title: "두 번째 화이트데이",
    text: "버티 보트 젤리빈 중에서도 제일 달콤한 맛만 골라 받은 것 같은 하루." },
  { cat: "화이트데이", icon: "🤍", label: "세 번째", date: "D+804 · 2026.03.14", title: "세 번째 화이트데이",
    text: "800일 기념일 나흘 뒤에 찾아온 세 번째 화이트데이. 받은 사탕보다 같이 웃은 시간이 더 달았다." },

  // ---------------- 생일 ----------------
  { cat: "생일", icon: "🎂", label: "수인 #1", date: "수인의 첫 번째 생일", title: "수인 누나의 첫 번째 생일",
    text: "해그리드의 삐뚤빼뚤한 생일 케이크처럼, 서툴러도 정성만은 가득했던 첫 생일 축하." },
  { cat: "생일", icon: "🎂", label: "수인 #2", date: "수인의 두 번째 생일", title: "수인 누나의 두 번째 생일",
    text: "촛불 앞에서 빌었던 소원이 무엇이었는지는 이 펜시브만 알고 있다." },
  { cat: "생일", icon: "🎂", label: "수인 #3", date: "수인의 세 번째 생일", title: "수인 누나의 세 번째 생일",
    text: "해마다 한 살씩 더 예뻐지는 마법은 마법부도 아직 해독하지 못했다." },
  { cat: "생일", icon: "🧁", label: "현수 #1", date: "현수의 첫 번째 생일", title: "현수의 첫 번째 생일",
    text: "열한 살 해리가 처음으로 진짜 생일 축하를 받았던 것처럼, 누나와 함께한 첫 생일." },
  { cat: "생일", icon: "🧁", label: "현수 #2", date: "현수의 두 번째 생일", title: "현수의 두 번째 생일",
    text: "한 살을 더 먹어도 연하남 현수의 귀여움 담당 자리는 변함없다." },
  { cat: "생일", icon: "🧁", label: "현수 #3", date: "현수의 세 번째 생일", title: "현수의 세 번째 생일",
    text: "공부와 실습에 지친 와중에도, 오늘 하루만큼은 무조건 주인공." },

  // ---------------- 졸업식 & 화이트코트 세리머니 ----------------
  { cat: "졸업·가운", icon: "🎓", label: "수인 졸업", date: "수인의 졸업식", title: "수인 누나의 졸업식 (N.E.W.T. 만점 수료)",
    text: "학사모를 쓴 수인 누나가 진짜 마법약 전문가로 세상에 나가는 날. 가장 먼저 달려와 축하해 준 사람은 현수." },
  { cat: "졸업·가운", icon: "🥼", label: "화이트코트", date: "현수의 화이트코트 세리머니", title: "현수의 화이트코트 세리머니",
    text: "올리밴더스에서 지팡이가 주인을 고르듯, 흰 가운이 현수를 선택한 날. 그 모습을 바라보던 누나의 광대는 그대로 승천했다." },

  // ---------------- 스키장 ----------------
  { cat: "스키장", icon: "💥", label: "정면 추돌", date: "SLOPE CASE #01", title: "비운의 정면 추돌 사건",
    text: "엣지 제어에 실패한 수인이 그대로 직진, 현수와 정면으로 쿵. 의무실 투어 끝에 들은 첫마디는 \"세상에서 제일 예쁜 수인이 누나\"였다." },
  { cat: "스키장", icon: "🏂", label: "휘닉스파크", date: "평창 휘닉스파크 · 홈 시즌", title: "우리의 겨울 베이스캠프",
    text: "헤아릴 수 없이 찾았던 휘닉스파크. 매서운 칼바람도 신나게 활주하던 열정 앞에서는 시원하기만 했고, 야간 보딩 뒤 먹던 따끈한 간식은 영원한 겨울의 맛이다." },
  { cat: "스키장", icon: "⛰️", label: "용평", date: "평창 용평리조트 · 발왕산", title: "발왕산 설산 탐험",
    text: "발왕산 정상의 차가운 눈꽃 바람을 맞으며 섰던 그날의 설렘. 휘팍과는 또 다른 웅장한 산세를 함께 마주하며 눈 위를 달렸다." },
  { cat: "스키장", icon: "🗻", label: "니세코", date: "2024.04 · 일본 니세코", title: "첫 해외 원정 파우더 라이딩",
    text: "4월에도 남아 있던 니세코의 파우더를 가르던 기억. 다음엔 눈 내리는 하늘을 보며 뜨끈한 온천까지 하고 오자고 약속했다.",
    image: "images/여행지/일본_니세코_오타루_삿포로/IMG_4351.JPEG" },
  { cat: "스키장", icon: "🇨🇭", label: "그린델발트", date: "2025.01 · 스위스 그린델발트", title: "아이거 북벽 아래에서의 보딩",
    text: "아이거 북벽을 바라보며 알프스 설원을 가로지른 날. 체르마트의 황금빛 마테호른과 함께 평생 잊지 못할 겨울 대장정.",
    image: "images/여행지/스위스/그린델발트/IMG_1579.JPEG" },
  { cat: "스키장", icon: "🇨🇦", label: "휘슬러", date: "2025.12 · 캐나다 휘슬러", title: "세계 2대 스키장 정복",
    text: "우리도 맛봤다, 휘슬러 블랙콤의 파우더. 영하 30도 옐로나이프의 오로라까지 품고 돌아온 캐나다 윈터 대탐험." },
  { cat: "스키장", icon: "🔀", label: "절벽 vs 오솔길", date: "SLOPE CASE #02", title: "극과 극 라이딩",
    text: "보드 잘 탄다고 상급자 절벽 코스로 슝 날아가 버린 현수, 초급 오솔길에서 전향 연습하다 꽈당 넘어지는 수인. 그래도 리프트는 꼭 같이 탔다." },

  // ---------------- 추억 사건 ----------------
  { cat: "추억 사건", icon: "🍲", label: "첫 4칸 냄비", date: "MEMORY · THE FIRST HOTPOT", title: "처음 마주한 4칸 냄비",
    text: "훠궈 맛도 모르던 수인이 현수 손에 이끌려 하이디라오에 처음 들어간 날. 토마토탕 한 숟갈에 잠들어 있던 훠궈 마법 본능이 깨어났다." },
  { cat: "추억 사건", icon: "👑", label: "VIP 등극", date: "MEMORY · PREMIUM VIP", title: "서울 하이디라오 도장 깨기 완료",
    text: "대학로, 명동, 강남, 영등포까지. 지점을 하나씩 격파한 끝에 1급 오러 훈장보다 귀하다는 PREMIUM VIP 등급을 손에 넣었다." },
  { cat: "추억 사건", icon: "🎤", label: "심야 떼창", date: "MEMORY · MIDNIGHT HIGHWAY", title: "설원행 심야 떼창 드라이브",
    text: "아이스아메리카노와 홈런볼을 싣고 달리던 밤의 고속도로. Waka Waka를 목청껏 부르며 졸음운전을 원천 차단했던 둘만의 이동 콘서트장." }
];

const pensieveShelf = document.getElementById("pensieveShelf");
const pensieveTabs = document.getElementById("pensieveTabs");
const pensieveBasin = document.getElementById("pensieveBasin");

function showPensieveMemory(index) {
  const memory = pensieveMemories[index];
  if (!memory) return;
  pensieveShelf.querySelectorAll(".memory-vial").forEach((v) => {
    v.classList.toggle("is-active", Number(v.dataset.memory) === index);
  });
  document.getElementById("pensieveDate").textContent = memory.date;
  document.getElementById("pensieveTitle").textContent = memory.title;
  document.getElementById("pensieveText").textContent = memory.text;
  const img = document.getElementById("pensieveImage");
  if (memory.image) {
    img.src = memory.image;
    img.alt = memory.title;
    img.classList.remove("hidden");
  } else {
    img.removeAttribute("src");
    img.classList.add("hidden");
  }
  pensieveBasin.classList.remove("is-swirling");
  void pensieveBasin.offsetWidth;
  pensieveBasin.classList.add("is-swirling");
}

function renderPensieveShelf(category) {
  pensieveTabs.querySelectorAll(".pensieve-tab").forEach((t) => {
    const active = t.dataset.cat === category;
    t.classList.toggle("is-active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  pensieveShelf.innerHTML = "";
  pensieveMemories.forEach((memory, index) => {
    if (memory.cat !== category) return;
    const vial = document.createElement("button");
    vial.type = "button";
    vial.className = "memory-vial";
    vial.dataset.memory = String(index);
    vial.innerHTML = '<span class="vial-glass">🫙<span class="vial-icon"></span></span><span class="vial-label"></span>';
    vial.querySelector(".vial-icon").textContent = memory.icon || "";
    vial.querySelector(".vial-label").textContent = memory.label;
    pensieveShelf.appendChild(vial);
  });
}

if (pensieveShelf && pensieveTabs && pensieveBasin) {
  pensieveCategories.forEach((cat) => {
    const count = pensieveMemories.filter((m) => m.cat === cat).length;
    if (!count) return;
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "pensieve-tab";
    tab.dataset.cat = cat;
    tab.setAttribute("role", "tab");
    tab.textContent = `${cat} ${count}`;
    pensieveTabs.appendChild(tab);
  });
  const countEl = document.getElementById("pensieveCount");
  if (countEl) countEl.textContent = `보관된 기억 병 ${pensieveMemories.length}개`;

  pensieveTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".pensieve-tab");
    if (tab) renderPensieveShelf(tab.dataset.cat);
  });
  pensieveShelf.addEventListener("click", (e) => {
    const vial = e.target.closest(".memory-vial");
    if (vial) showPensieveMemory(Number(vial.dataset.memory));
  });
  renderPensieveShelf(pensieveCategories[0]);
}

const castPatronusBtn = document.getElementById("castPatronusBtn");
if (castPatronusBtn) {
  castPatronusBtn.addEventListener("click", () => {
    const section = castPatronusBtn.closest("section");
    section.classList.add("patronus-casting");
    playLumosSpellSound();
    setTimeout(() => section.classList.remove("patronus-casting"), 2600);
  });
}

document.querySelectorAll(".erised-mirror").forEach((mirror) => {
  mirror.addEventListener("click", () => {
    mirror.classList.toggle("is-revealed");
  });
});

// 초기화
window.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
});
