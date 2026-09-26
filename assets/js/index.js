    // 실제 기록을 받으면 날짜, 제목, 설명, 이미지 경로를 이 배열에서 교체합니다.
    const highwayTimelineEntries = [
      { date: "YYYY.MM.DD", title: "첫 번째 기록", description: "이곳에 첫 번째 여행 기록을 한두 줄로 적어 주세요.", image: "images/고속도로일지/타임라인/01.jpg" },
      { date: "YYYY.MM.DD", title: "두 번째 기록", description: "이곳에 두 번째 여행 기록을 한두 줄로 적어 주세요.", image: "images/고속도로일지/타임라인/02.jpg" },
      { date: "YYYY.MM.DD", title: "세 번째 기록", description: "이곳에 세 번째 여행 기록을 한두 줄로 적어 주세요.", image: "images/고속도로일지/타임라인/03.jpg" }
    ];

    const highwayTimelineTrack = document.getElementById("highwayTimelineTrack");
    const highwayTimelineModal = document.getElementById("highwayTimelineModal");
    const highwayTimelineModalImage = document.getElementById("highwayTimelineModalImage");
    const highwayTimelineImageFallback = document.getElementById("highwayTimelineImageFallback");
    let highwayTimelineTrigger = null;

    function closeHighwayTimelineModal() {
      highwayTimelineModal.classList.add("hidden");
      highwayTimelineModal.classList.remove("flex");
      highwayTimelineModalImage.removeAttribute("src");
      highwayTimelineTrigger?.focus();
    }

    function openHighwayTimelineModal(entry, trigger) {
      highwayTimelineTrigger = trigger;
      document.getElementById("highwayTimelineModalDate").textContent = entry.date;
      document.getElementById("highwayTimelineModalTitle").textContent = entry.title;
      document.getElementById("highwayTimelineModalDescription").textContent = entry.description;
      highwayTimelineModalImage.alt = entry.title + " 사진";
      highwayTimelineModalImage.classList.add("hidden");
      highwayTimelineImageFallback.classList.remove("hidden");
      highwayTimelineModalImage.src = entry.image;
      highwayTimelineModal.classList.remove("hidden");
      highwayTimelineModal.classList.add("flex");
      document.getElementById("highwayTimelineModalClose").focus();
    }

    highwayTimelineModalImage.addEventListener("load", () => {
      highwayTimelineModalImage.classList.remove("hidden");
      highwayTimelineImageFallback.classList.add("hidden");
    });
    highwayTimelineModalImage.addEventListener("error", () => {
      highwayTimelineModalImage.classList.add("hidden");
      highwayTimelineImageFallback.classList.remove("hidden");
    });

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

    document.getElementById("highwayTimelineModalClose").addEventListener("click", closeHighwayTimelineModal);
    highwayTimelineModal.addEventListener("click", (event) => {
      if (event.target === highwayTimelineModal) closeHighwayTimelineModal();
    });
    highwayTimelineModal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeHighwayTimelineModal();
      if (event.key === "Tab") {
        event.preventDefault();
        document.getElementById("highwayTimelineModalClose").focus();
      }
    });

    // 1. Web Audio Synthesizer (Zero External Audio Dependencies)
    let prophetAudioCtx = null;
    function getProphetAudioCtx() {
      if (!prophetAudioCtx) {
        prophetAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (prophetAudioCtx.state === 'suspended') {
        prophetAudioCtx.resume();
      }
      return prophetAudioCtx;
    }

    function playWandSpellChime() {
      try {
        const ctx = getProphetAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.42);
      } catch (e) {}
    }

    function playSpellBuzzer() {
      try {
        const ctx = getProphetAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {}
    }

    // Custom Message Box
    function alertBox(text, icon = "🪄") {
      const modal = document.getElementById("msgModal");
      const modalText = document.getElementById("msgModalText");
      const modalIcon = document.getElementById("msgModalIcon");
      if (!modal || !modalText) return;
      modalText.textContent = text;
      modalIcon.textContent = icon;
      modal.classList.remove("hidden");
    }

    document.getElementById("msgModalCloseBtn")?.addEventListener("click", () => {
      document.getElementById("msgModal")?.classList.add("hidden");
    });

    // 2. 마법 퀴즈 데이터 및 상호작용
    const QUIZ_DATA = [
      {
        question: "1. 우리가 처음 만났던 마법 같은 장소는?",
        options: ["도심 속 아늑한 카페", "새하얀 스키장 슬로프", "호그와트 대연회장", "성 뭉고 병원 로비"],
        answer: 0,
        tip: "수줍게 첫 눈빛을 주고받았던 그날의 따뜻한 공기!"
      },
      {
        question: "2. 스키장에서 넘어진 상대를 구하는 가장 올바른 주문은?",
        options: ["혼자 쌩 내려가며 손 흔들기", "눈사람처럼 굴러도 손잡고 일으켜 세우기", "사진 찍어서 놀리기", "패트롤 부르기"],
        answer: 1,
        tip: "눈밭에서 함께 뒹굴며 웃고 다정하게 손잡아주기!"
      },
      {
        question: "3. 상대방이 당직 후 지쳐서 삐졌을 때 최고의 즉효 처방전은?",
        options: ["달콤한 디저트 사다 바치기 + 3초 포옹", "모른 척 혼자 게임하기", "공복에 잔소리 폭격", "3시간 동안 토론하기"],
        answer: 0,
        tip: "평화의 물약 조제법: 달콤한 간식과 따뜻한 포옹!"
      },
      {
        question: "4. 오늘 우리가 함께 맞이한 기적 같은 기념일의 숫자는?",
        options: ["100일", "365일", "1,000일", "10,000일"],
        answer: 2,
        tip: "1000일 동안 함께해 줘서 진심으로 고마워!"
      }
    ];

    let userAnswers = {};

    function renderQuiz() {
      const container = document.getElementById("quizContainer");
      if (!container) return;

      container.innerHTML = QUIZ_DATA.map((q, qIdx) => `
        <div class="bg-parchment-50 p-3 border border-ink shadow-xs">
          <h5 class="font-headline font-bold text-xs sm:text-sm text-ink mb-2">
            ${q.question}
          </h5>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            ${q.options.map((opt, oIdx) => `
              <button 
                class="quiz-opt-btn text-left p-2 border border-ink/40 bg-[#f7efdc] hover:bg-[#ebdab4] rounded-xs text-[11px] font-serif transition flex items-center justify-between cursor-pointer"
                data-qid="${qIdx}"
                data-oid="${oIdx}"
              >
                <span>${opt}</span>
                <span class="quiz-check font-bold"></span>
              </button>
            `).join("")}
          </div>
        </div>
      `).join("");

      document.querySelectorAll(".quiz-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const qid = parseInt(btn.getAttribute("data-qid"), 10);
          const oid = parseInt(btn.getAttribute("data-oid"), 10);
          checkQuizAnswer(qid, oid, btn);
        });
      });
    }

    function checkQuizAnswer(qIdx, oIdx, btn) {
      const isCorrect = QUIZ_DATA[qIdx].answer === oIdx;
      userAnswers[qIdx] = isCorrect;

      const parent = btn.parentElement;
      parent.querySelectorAll(".quiz-opt-btn").forEach(b => {
        b.classList.remove("bg-emerald-100", "border-emerald-800", "bg-red-100", "border-red-800", "text-emerald-900", "text-red-900");
        b.querySelector(".quiz-check").textContent = "";
      });

      if (isCorrect) {
        playWandSpellChime();
        btn.classList.add("bg-emerald-100", "border-emerald-800", "text-emerald-900");
        btn.querySelector(".quiz-check").textContent = "✓ (O.W.L. 정답!)";
      } else {
        playSpellBuzzer();
        btn.classList.add("bg-red-100", "border-red-800", "text-red-900");
        btn.querySelector(".quiz-check").textContent = "✕ (재도전)";
      }

      const score = Object.values(userAnswers).filter(Boolean).length;
      const scoreBadge = document.getElementById("quizScoreBadge");
      if (scoreBadge) scoreBadge.textContent = `점수: ${score} / 4`;

      if (score === 4) {
        setTimeout(() => {
          alertBox("🏆 축하합니다! 사랑 능력 평가 O.W.L. 100점 만점(특출함·O)을 달성했습니다!", "✨");
        }, 300);
      }
    }

    // 3. 낱말 퍼즐 (Crossword) 정답 확인
    const checkCrosswordBtn = document.getElementById("checkCrosswordBtn");
    const cwSuccessBox = document.getElementById("cwSuccessBox");

    checkCrosswordBtn?.addEventListener("click", () => {
      const a1 = document.getElementById("cw1")?.value.trim();
      const a2 = document.getElementById("cw2")?.value.trim();
      const a3 = document.getElementById("cw3")?.value.trim();
      const a4 = document.getElementById("cw4")?.value.trim();

      const isCorrect1 = a1 === "스키장" || a1 === "설원행";
      const isCorrect2 = a2 === "디저트" || a2 === "마카롱" || a2 === "핫초코" || a2 === "커피";
      const isCorrect3 = a3 === "스노우보드" || a3 === "스노보드";
      const isCorrect4 = a4 === "1000" || a4 === "천일";

      if (isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4) {
        playWandSpellChime();
        cwSuccessBox?.classList.remove("hidden");
        alertBox("✨ 퍼즐이 완벽하게 풀렸습니다! 숨겨진 마법 메시지가 공개되었습니다.");
      } else {
        playSpellBuzzer();
        alertBox("아직 빈칸이 비어있거나 마법 단어가 일치하지 않습니다. (힌트: 스키장, 디저트, 스노우보드, 1000)");
      }
    });

    // 4. 그린고츠 비밀 금고
    const openVaultBtn = document.getElementById("openVaultBtn");
    const vaultPasscode = document.getElementById("vaultPasscode");
    const vaultDial = document.getElementById("vaultDial");
    const vaultModal = document.getElementById("vaultModal");
    const closeVaultModalBtn = document.getElementById("closeVaultModalBtn");
    const confirmVaultBtn = document.getElementById("confirmVaultBtn");

    openVaultBtn?.addEventListener("click", () => {
      const code = vaultPasscode.value.trim();
      if (code === "1000") {
        playWandSpellChime();
        vaultDial.style.transform = "rotate(360deg)";
        vaultDial.textContent = "🔓";

        setTimeout(() => {
          vaultModal.classList.remove("hidden");
        }, 600);
      } else {
        playSpellBuzzer();
        vaultDial.style.transform = "rotate(-25deg)";
        alertBox("암호가 올바르지 않습니다. (힌트: 1000)", "🔒");
        setTimeout(() => {
          vaultDial.style.transform = "rotate(0deg)";
        }, 400);
      }
    });

    closeVaultModalBtn?.addEventListener("click", () => vaultModal.classList.add("hidden"));
    confirmVaultBtn?.addEventListener("click", () => vaultModal.classList.add("hidden"));

    // 5. 도둑 지도 (Marauder's Map) iframe 전체화면 토글 인터랙션
    const toggleMapFullscreenBtn = document.getElementById("toggleMapFullscreenBtn");
    const mapIframeWrapper = document.getElementById("mapIframeWrapper");
    const mapFsLabel = document.getElementById("mapFsLabel");
    let isMapFullscreen = false;

    toggleMapFullscreenBtn?.addEventListener("click", () => {
      playWandSpellChime();
      isMapFullscreen = !isMapFullscreen;

      if (isMapFullscreen) {
        mapIframeWrapper?.classList.add("fixed", "inset-2", "sm:inset-4", "z-50", "!max-h-none", "!min-h-0", "shadow-[0_0_90px_rgba(0,0,0,0.95)]");
        if (mapFsLabel) mapFsLabel.textContent = "신문 크기로 축소";
        toggleMapFullscreenBtn.classList.add("bg-ink-crimson", "text-amber-300");
        document.body.style.overflow = "hidden";
      } else {
        mapIframeWrapper?.classList.remove("fixed", "inset-2", "sm:inset-4", "z-50", "!max-h-none", "!min-h-0", "shadow-[0_0_90px_rgba(0,0,0,0.95)]");
        if (mapFsLabel) mapFsLabel.textContent = "전체화면 확대";
        toggleMapFullscreenBtn.classList.remove("bg-ink-crimson", "text-amber-300");
        document.body.style.overflow = "";
      }
    });

    // 6. 설원행 심야 드라이브 플레이리스트 인터랙션
    const playlistPlayBtn = document.getElementById("playlistPlayBtn");
    const playlistPlayIcon = document.getElementById("playlistPlayIcon");
    const playlistStatusBadge = document.getElementById("playlistStatusBadge");
    const currentTrackIndex = document.getElementById("currentTrackIndex");
    const currentTrackTitle = document.getElementById("currentTrackTitle");
    const currentTrackTime = document.getElementById("currentTrackTime");
    const playlistProgressBar = document.getElementById("playlistProgressBar");
    const playlistTrackItems = document.querySelectorAll(".playlist-track-item");

    let isPlaylistPlaying = false;

    function playMusicChime() {
      try {
        const ctx = getProphetAudioCtx();
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
      } catch (e) {
        // AudioContext 오류 무시
      }
    }

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
          playlistStatusBadge.className = "text-[9.5px] font-mono text-emerald-800 font-bold flex items-center gap-1";
        }
        playMusicChime();
      } else {
        playlistPlayIcon?.classList.remove("fa-pause");
        playlistPlayIcon?.classList.add("fa-play");
        if (playlistStatusBadge) {
          playlistStatusBadge.innerHTML = `<span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span><span>PAUSED</span>`;
          playlistStatusBadge.className = "text-[9.5px] font-mono text-amber-800 font-bold flex items-center gap-1";
        }
      }
    });

    // 페이지 로드 시 퀴즈 초기화
    window.addEventListener("DOMContentLoaded", () => {
      renderQuiz();
    });
