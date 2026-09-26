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
let bgmMasterGain = null;
let isSoundOn = true;
let cachedNoiseBuffer = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    bgmMasterGain = audioCtx.createGain();
    bgmMasterGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    bgmMasterGain.connect(audioCtx.destination);
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
// 2.5 해리포터 오프닝 테마 BGM (Hedwig's Theme) 웹 오디오 합성기
// -------------------------------------------------------------
const NOTE_FREQS = {
  B3: 246.94, C4: 261.63, D4: 293.66, "D#4": 311.13, Eb4: 311.13, E4: 329.63,
  F4: 349.23, "F#4": 369.99, G4: 392.00, "G#4": 415.30, A4: 440.00, "A#4": 466.16,
  Bb4: 466.16, B4: 493.88, C5: 523.25, "C#5": 554.37, D5: 587.33, "D#5": 622.25,
  Eb5: 622.25, E5: 659.25, F5: 698.46, "F#5": 739.99, G5: 783.99, "G#5": 830.61,
  A5: 880.00, "A#5": 932.33, Bb5: 932.33, B5: 987.77, C6: 1046.50, "C#6": 1108.73,
  D6: 1174.66, "D#6": 1244.51, E6: 1318.51, F6: 1396.91, "F#6": 1479.98, G6: 1567.98,
  REST: 0
};

const BEAT_UNIT = 0.28; // 8분음표 단위 시간 (초)

// 해리포터 시그니처 오프닝 멜로디 (Hedwig's Theme)
const HEDWIG_MELODY = [
  // 1부: 신비로운 호그와트의 서막
  { n: "B4", b: 2 },
  { n: "E5", b: 3 },
  { n: "G5", b: 1 },
  { n: "F#5", b: 2 },
  { n: "E5", b: 4 },
  { n: "B5", b: 2 },
  { n: "A5", b: 5.5 },
  { n: "F#5", b: 5.5 },
  { n: "E5", b: 3 },
  { n: "G5", b: 1 },
  { n: "F#5", b: 2 },
  { n: "D#5", b: 3.5 },
  { n: "F5", b: 2 },
  { n: "B4", b: 5.5 },
  { n: "REST", b: 1 },

  // 2부: 고음 도약 및 반음계 하강 테마
  { n: "B4", b: 2 },
  { n: "E5", b: 3 },
  { n: "G5", b: 1 },
  { n: "F#5", b: 2 },
  { n: "E5", b: 4 },
  { n: "B5", b: 2 },
  { n: "D6", b: 3.5 },
  { n: "C#6", b: 2 },
  { n: "C6", b: 3.5 },
  { n: "G#5", b: 2 },
  { n: "C6", b: 2.5 },
  { n: "B5", b: 1 },
  { n: "Bb5", b: 2 },
  { n: "Bb4", b: 2 },
  { n: "G5", b: 2 },
  { n: "E5", b: 6 },
  { n: "REST", b: 2 },

  // 3부: 마법 왈츠 변주 (오르골 첼레스타 시머링)
  { n: "G5", b: 1.5 },
  { n: "B5", b: 3 },
  { n: "G5", b: 1.5 },
  { n: "B5", b: 3 },
  { n: "G5", b: 1.5 },
  { n: "C6", b: 3 },
  { n: "B5", b: 1.5 },
  { n: "Bb5", b: 3 },
  { n: "F#5", b: 2 },
  { n: "G5", b: 2.5 },
  { n: "B5", b: 1 },
  { n: "Bb5", b: 2 },
  { n: "Bb4", b: 2 },
  { n: "B4", b: 2 },
  { n: "B5", b: 6 },
  { n: "REST", b: 3 }
];

// 은은한 오케스트라 배경 현악 화음 (Em - Am - B7 패드)
const HEDWIG_PADS = [
  { chords: [164.81, 246.94], startBeat: 0, beats: 17 }, // Em
  { chords: [110.00, 164.81, 220.00], startBeat: 17, beats: 11 }, // Am
  { chords: [123.47, 185.00], startBeat: 28, beats: 13 }, // B7
  { chords: [164.81, 246.94], startBeat: 41, beats: 18 }, // Em
  { chords: [130.81, 196.00, 246.94], startBeat: 59, beats: 11 }, // Cmaj7
  { chords: [103.83, 155.56, 207.65], startBeat: 70, beats: 8 }, // G#dim
  { chords: [164.81, 246.94, 329.63], startBeat: 78, beats: 15 }, // Em
  { chords: [164.81, 246.94], startBeat: 93, beats: 12 }, // Em waltz
  { chords: [130.81, 196.00], startBeat: 105, beats: 6 }, // C
  { chords: [123.47, 185.00], startBeat: 111, beats: 6 }, // B7
  { chords: [164.81, 246.94, 329.63], startBeat: 117, beats: 16 } // Em
];

// 영롱한 오르골 첼레스타 음색 합성기
function playCelestaNote(ctx, dest, freq, time, duration) {
  if (!freq || freq <= 0) return;

  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, time);

  // 첼레스타 메탈릭 벨 배음 (2.76배 배음)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(freq * 2.76, time);

  // 따뜻한 몸체 울림 삼각파
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = "triangle";
  osc3.frequency.setValueAtTime(freq, time);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(3400, time);
  filter.Q.setValueAtTime(1.2, time);

  const attack = 0.006;
  const decay = Math.max(duration * 1.35, 0.75);

  gain1.gain.setValueAtTime(0.0001, time);
  gain1.gain.linearRampToValueAtTime(0.18, time + attack);
  gain1.gain.exponentialRampToValueAtTime(0.065, time + attack + 0.12);
  gain1.gain.exponentialRampToValueAtTime(0.0001, time + attack + decay);

  gain2.gain.setValueAtTime(0.0001, time);
  gain2.gain.linearRampToValueAtTime(0.05, time + attack);
  gain2.gain.exponentialRampToValueAtTime(0.0001, time + attack + (decay * 0.45));

  gain3.gain.setValueAtTime(0.0001, time);
  gain3.gain.linearRampToValueAtTime(0.035, time + attack);
  gain3.gain.exponentialRampToValueAtTime(0.0001, time + attack + (decay * 0.85));

  osc1.connect(gain1);
  osc2.connect(gain2);
  osc3.connect(gain3);

  gain1.connect(filter);
  gain2.connect(filter);
  gain3.connect(filter);

  filter.connect(dest);

  osc1.start(time);
  osc2.start(time);
  osc3.start(time);

  const stopTime = time + attack + decay + 0.05;
  osc1.stop(stopTime);
  osc2.stop(stopTime);
  osc3.stop(stopTime);
}

// 은은한 저음 패드 화음 합성기
function playWarmPadChord(ctx, dest, chordFreqs, time, duration) {
  if (!chordFreqs || !chordFreqs.length) return;

  const padFilter = ctx.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.setValueAtTime(450, time);
  padFilter.connect(dest);

  const attack = 0.4;
  const release = 0.6;
  const noteDuration = Math.max(duration, 1.0);

  chordFreqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.022, time + attack);
    gain.gain.setValueAtTime(0.022, time + noteDuration - release);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + noteDuration);

    osc.connect(gain);
    gain.connect(padFilter);

    osc.start(time);
    osc.stop(time + noteDuration + 0.1);
  });
}

let bgmTimer = null;
let isBgmRunning = false;

function scheduleHedwigLoop() {
  if (!isSoundOn) return;
  const ctx = getAudioCtx();
  if (!ctx || ctx.state !== "running") return;

  const startTime = ctx.currentTime + 0.08;
  let cursorTime = startTime;

  // 1. 첼레스타 멜로디 스케줄링
  HEDWIG_MELODY.forEach((item) => {
    const dur = item.b * BEAT_UNIT;
    if (item.n !== "REST") {
      const f = NOTE_FREQS[item.n];
      if (f) playCelestaNote(ctx, bgmMasterGain, f, cursorTime, dur);
    }
    cursorTime += dur;
  });

  // 2. 배경 화음 패드 스케줄링
  HEDWIG_PADS.forEach((pad) => {
    const pTime = startTime + pad.startBeat * BEAT_UNIT;
    const pDur = pad.beats * BEAT_UNIT;
    playWarmPadChord(ctx, bgmMasterGain, pad.chords, pTime, pDur);
  });

  const totalLoopDuration = cursorTime - startTime;

  if (bgmTimer) clearTimeout(bgmTimer);
  bgmTimer = setTimeout(() => {
    if (isSoundOn && ctx.state === "running") {
      scheduleHedwigLoop();
    }
  }, Math.max((totalLoopDuration - 0.25) * 1000, 2000));
}

function startBgm() {
  if (isBgmRunning) return;
  isBgmRunning = true;
  scheduleHedwigLoop();
}

function stopBgm() {
  isBgmRunning = false;
  if (bgmTimer) {
    clearTimeout(bgmTimer);
    bgmTimer = null;
  }
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
  isSoundOn = !isSoundOn;
  const ctx = getAudioCtx();

  if (isSoundOn) {
    // 플레이리스트 곡이 재생 중이었다면 충돌 방지를 위해 일시정지
    if (typeof pausePlaylistTrack === "function" && isPlaylistPlaying) {
      pausePlaylistTrack();
    }

    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    if (bgmMasterGain && ctx) {
      bgmMasterGain.gain.cancelScheduledValues(ctx.currentTime);
      bgmMasterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      bgmMasterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.3);
    }
    if (!isBgmRunning) {
      startBgm();
    }
    playMusicChime();
  } else {
    if (bgmMasterGain && ctx) {
      bgmMasterGain.gain.cancelScheduledValues(ctx.currentTime);
      bgmMasterGain.gain.setValueAtTime(bgmMasterGain.gain.value, ctx.currentTime);
      bgmMasterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    }
    stopBgm();
  }

  updateSoundUI(isSoundOn);

  const mapFrame = document.getElementById("maraudersMapFrame");
  if (mapFrame && mapFrame.contentWindow) {
    try {
      mapFrame.contentWindow.postMessage({ type: "MAP_SOUND_TOGGLE", isSoundOn }, "*");
    } catch (e) {}
  }
}

if (mapSoundBtn) mapSoundBtn.addEventListener("click", toggleSoundState);
if (floatingBgmBtn) floatingBgmBtn.addEventListener("click", toggleSoundState);

// 페이지 접속 시 즉시 자동재생 시도 & 브라우저 제스처 해제 리스너
function tryAutoplayHedwig() {
  const ctx = getAudioCtx();
  if (!ctx) return;

  if (ctx.state === "running") {
    startBgm();
    updateSoundUI(true);
  } else {
    ctx.resume().then(() => {
      if (ctx.state === "running" && isSoundOn) {
        startBgm();
        updateSoundUI(true);
      }
    }).catch(() => {});
  }
}

function unlockOnFirstGesture() {
  const ctx = getAudioCtx();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().then(() => {
      if (isSoundOn && !isBgmRunning) {
        startBgm();
      }
      updateSoundUI(isSoundOn);
    });
  } else if (isSoundOn && !isBgmRunning) {
    startBgm();
    updateSoundUI(isSoundOn);
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

  // 2. 배경 오르골 테마(Hedwig's Theme)는 노래와 겹치지 않도록 자동 일시정지
  if (isSoundOn) {
    const ctx = getAudioCtx();
    if (bgmMasterGain && ctx) {
      bgmMasterGain.gain.cancelScheduledValues(ctx.currentTime);
      bgmMasterGain.gain.setValueAtTime(bgmMasterGain.gain.value, ctx.currentTime);
      bgmMasterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    }
    stopBgm();
    updateSoundUI(false);
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
    } catch (e) {}
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

// 초기화
window.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
});
