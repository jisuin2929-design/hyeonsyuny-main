    // Pure Web Audio API Synthesizer
    let audioCtx = null;
    let isSoundEnabled = true;
    window.addEventListener("message", (e) => {
      if (e.data && typeof e.data.isSoundOn === "boolean") {
        isSoundEnabled = e.data.isSoundOn;
      }
    });

    function getAudioCtx() {
      if (!isSoundEnabled) return null;
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function playMagicChime() {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
          gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + idx * 0.09 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.65);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.09);
          osc.stop(ctx.currentTime + idx * 0.09 + 0.7);
        });
      } catch (e) {}
    }

    function playWandWoosh() {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.32);
      } catch (e) {}
    }

    const SEOUL_COORDS = [126.9780, 37.5665];
    let currentRealm = 'overseas'; // Overseas first
    let currentProjectionType = '2d';
    let worldGeoJsonData = null;
    let koreaGeoJsonData = null; // High-detail South Korea Provinces
    let selectedSpot = null;
    let isAutoRotating = false;
    let rotationTimer = null;
    let currentRotation = [-150, 0];
    let zoomBehavior;
    let currentZoomScale = 1;
    let isAdminMode = false;
    const ADMIN_PASSPHRASE = "alohomora";

    // IndexedDB for Unlimited Photos
    const DB_NAME = "DailyProphetTravelDB_v2";
    const DB_STORE = "destinationPhotos";
    let dbInstance = null;

    function initDB() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(DB_STORE)) {
            const store = db.createObjectStore(DB_STORE, { keyPath: "id", autoIncrement: true });
            store.createIndex("destId", "destId", { unique: false });
          }
        };
        req.onsuccess = (e) => {
          dbInstance = e.target.result;
          resolve(dbInstance);
        };
        req.onerror = (e) => reject(e);
      });
    }

    function savePhotoToDB(item) {
      return new Promise((resolve, reject) => {
        if (!dbInstance) return resolve(null);
        const tx = dbInstance.transaction([DB_STORE], "readwrite");
        const store = tx.objectStore(DB_STORE);
        const req = store.add(item);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }

    function deletePhotoFromDB(id) {
      return new Promise((resolve, reject) => {
        if (!dbInstance) return resolve(null);
        const tx = dbInstance.transaction([DB_STORE], "readwrite");
        const store = tx.objectStore(DB_STORE);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    }

    function getPhotosFromDB(destId) {
      return new Promise((resolve) => {
        if (!dbInstance) return resolve([]);
        const tx = dbInstance.transaction([DB_STORE], "readonly");
        const store = tx.objectStore(DB_STORE);
        const index = store.index("destId");
        const req = index.getAll(destId);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }

    // SVG & D3 setup
    const svg = d3.select("#mapSvg");
    const containerEl = document.getElementById("mapContainer");
    let width = containerEl.clientWidth || 800;
    let height = containerEl.clientHeight || 600;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");
    const arcGlow = defs.append("filter").attr("id", "magicArcGlow").attr("x", "-30%").attr("y", "-30%").attr("width", "160%").attr("height", "160%");
    arcGlow.append("feGaussianBlur").attr("stdDeviation", "2").attr("result", "blur");
    const arcMerge = arcGlow.append("feMerge");
    arcMerge.append("feMergeNode").attr("in", "blur");
    arcMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Map Layers
    const oceanGroup = svg.append("g").attr("class", "ocean-layer");
    const graticuleGroup = svg.append("g").attr("class", "graticule-layer");
    const landGroup = svg.append("g").attr("class", "land-layer");
    const decorGroup = svg.append("g").attr("class", "decor-layer");
    const routeGroup = svg.append("g").attr("class", "route-layer");
    const markerGroup = svg.append("g").attr("class", "marker-layer");
    const planeSimGroup = svg.append("g").attr("class", "plane-sim-layer");

    let projection;
    let pathGenerator;

    function createProjection(realm, projType) {
      if (realm === 'domestic') {
        return d3.geoMercator()
          .center([127.7, 36.35])
          .scale(Math.min(width, height) * 7.5)
          .translate([width / 2, height / 2 - 16]);
      } else {
        if (projType === '3d') {
          return d3.geoOrthographic()
            .scale(Math.min(width, height) / 2.3)
            .translate([width / 2, height / 2 - 12])
            .rotate([-127, -25])
            .clipAngle(90);
        } else {
          return d3.geoNaturalEarth1()
            .scale(Math.min(width / 5.5, height / 2.65))
            .translate([width / 2, height / 2 - 18])
            .rotate([-150, 0]);
        }
      }
    }

    function initProjection(projType = currentProjectionType) {
      currentProjectionType = projType;
      projection = createProjection(currentRealm, projType);
      pathGenerator = d3.geoPath().projection(projection);

      const autoRotateBtn = document.getElementById("autoRotateBtn");
      const globeBtn = document.getElementById("globeBtn");

      if (currentRealm === 'domestic') {
        globeBtn.classList.add("hidden");
        autoRotateBtn.classList.add("hidden");
        stopAutoRotation();
      } else {
        globeBtn.classList.remove("hidden");
        if (projType === '3d') {
          autoRotateBtn.classList.remove("hidden");
          if (isAutoRotating) startAutoRotation();
        } else {
          autoRotateBtn.classList.add("hidden");
          stopAutoRotation();
        }
      }

      setupInteractions();
      renderMap();
    }

    function setupInteractions() {
      svg.on(".zoom", null);
      svg.on(".drag", null);

      if (currentRealm === 'overseas' && currentProjectionType === '3d') {
        const drag = d3.drag()
          .on("start", () => { if (isAutoRotating) stopAutoRotation(false); })
          .on("drag", (event) => {
            const rotate = projection.rotate();
            const k = 75 / projection.scale();
            currentRotation = [rotate[0] + event.dx * k, Math.max(-80, Math.min(80, rotate[1] - event.dy * k))];
            projection.rotate(currentRotation);
            updatePaths();
          })
          .on("end", () => { if (isAutoRotating) startAutoRotation(); });

        svg.call(drag);

        zoomBehavior = d3.zoom()
          .scaleExtent([0.65, 4.5])
          .on("zoom", (event) => {
            const baseScale = Math.min(width, height) / 2.3;
            projection.scale(baseScale * event.transform.k);
            updatePaths();
          });
        svg.call(zoomBehavior).on("dblclick.zoom", null);

      } else {
        zoomBehavior = d3.zoom()
          .scaleExtent([0.8, 30])
          .on("zoom", (event) => {
            currentZoomScale = event.transform.k;
            landGroup.attr("transform", event.transform);
            oceanGroup.attr("transform", event.transform);
            graticuleGroup.attr("transform", event.transform);
            decorGroup.attr("transform", event.transform);
            routeGroup.attr("transform", event.transform);
            markerGroup.attr("transform", event.transform);
            planeSimGroup.attr("transform", event.transform);

            // Inversive dynamic scale calculation to completely prevent text collision
            const effectiveScale = Math.max(0.48, Math.min(1.2, 1 / Math.pow(currentZoomScale, 0.78)));

            markerGroup.selectAll(".marker-node")
              .attr("transform", function() {
                const ox = d3.select(this).attr("data-ox");
                const oy = d3.select(this).attr("data-oy");
                return `translate(${ox}, ${oy}) scale(${effectiveScale})`;
              });
          });
        svg.call(zoomBehavior).on("dblclick.zoom", null);
      }
    }

    function startAutoRotation() {
      stopAutoRotation(false);
      isAutoRotating = true;
      document.getElementById("autoRotateBtn").classList.add("text-[#841c1c]");
      document.getElementById("rotateBtnLabel").textContent = "자전 ON";

      rotationTimer = d3.timer(() => {
        if (currentRealm !== 'overseas' || currentProjectionType !== '3d') return;
        currentRotation[0] += 0.2;
        projection.rotate(currentRotation);
        updatePaths();
      });
    }

    function stopAutoRotation(updateUI = true) {
      if (rotationTimer) {
        rotationTimer.stop();
        rotationTimer = null;
      }
      if (updateUI) {
        isAutoRotating = false;
        const btn = document.getElementById("autoRotateBtn");
        if (btn) btn.classList.remove("text-[#841c1c]");
        const lbl = document.getElementById("rotateBtnLabel");
        if (lbl) lbl.textContent = "자전 OFF";
      }
    }

    function renderMap() {
      if (!worldGeoJsonData) return;

      landGroup.attr("transform", null);
      oceanGroup.attr("transform", null);
      graticuleGroup.attr("transform", null);
      decorGroup.attr("transform", null);
      routeGroup.attr("transform", null);
      markerGroup.attr("transform", null);
      planeSimGroup.attr("transform", null);

      oceanGroup.selectAll("*").remove();
      if (currentRealm === 'overseas' && currentProjectionType === '3d') {
        oceanGroup.append("circle")
          .attr("cx", projection.translate()[0])
          .attr("cy", projection.translate()[1])
          .attr("r", projection.scale())
          .attr("fill", "#e7d8be")
          .attr("stroke", "#4a331c")
          .attr("stroke-width", 1.8);
      } else {
        oceanGroup.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", "#e7d8be");
      }

      graticuleGroup.selectAll("*").remove();
      const graticule = d3.geoGraticule10();
      graticuleGroup.append("path")
        .datum(graticule)
        .attr("d", pathGenerator)
        .attr("fill", "none")
        .attr("stroke", "rgba(90, 60, 30, 0.12)")
        .attr("stroke-width", 0.8)
        .attr("stroke-dasharray", "4,3");

      landGroup.selectAll("*").remove();

      if (currentRealm === 'domestic' && koreaGeoJsonData) {
        landGroup.selectAll(".province-path")
          .data(koreaGeoJsonData.features)
          .enter()
          .append("path")
          .attr("class", "province-path")
          .attr("d", pathGenerator)
          .attr("fill", "#f8f1df")
          .attr("stroke", "#5a3d24")
          .attr("stroke-width", 0.9);
      } else {
        const paths = landGroup.selectAll(".country-path").data(worldGeoJsonData.features);
        paths.enter()
          .append("path")
          .attr("class", "country-path")
          .merge(paths)
          .attr("d", pathGenerator)
          .attr("fill", "#f7efdc")
          .attr("stroke", "#4a331c")
          .attr("stroke-width", currentRealm === 'domestic' ? 1.3 : 0.7);
        paths.exit().remove();
      }

      renderVintageDecorations();
      renderMarkersAndRoutes();
    }

    function updatePaths() {
      if (currentRealm === 'overseas' && currentProjectionType === '3d') {
        oceanGroup.select("circle")
          .attr("r", projection.scale())
          .attr("cx", projection.translate()[0])
          .attr("cy", projection.translate()[1]);
      }
      graticuleGroup.selectAll("path").attr("d", pathGenerator);
      landGroup.selectAll("path").attr("d", pathGenerator);
      renderVintageDecorations();
      renderMarkersAndRoutes();
    }

    function renderVintageDecorations() {
      decorGroup.selectAll("*").remove();

      if (currentRealm === 'domestic') {
        const rivers = [
          [[126.65, 37.75], [126.97, 37.53], [127.20, 37.54], [127.50, 37.51], [127.90, 37.30]],
          [[128.92, 35.10], [128.70, 35.50], [128.45, 36.00], [128.30, 36.60]],
          [[126.68, 36.00], [127.05, 36.25], [127.35, 36.45]]
        ];

        rivers.forEach(rCoords => {
          const rLine = { type: "LineString", coordinates: rCoords };
          const p = pathGenerator(rLine);
          if (p) {
            decorGroup.append("path")
              .datum(rLine)
              .attr("d", p)
              .attr("fill", "none")
              .attr("stroke", "rgba(100, 130, 150, 0.45)")
              .attr("stroke-width", 1.4)
              .attr("stroke-dasharray", "3, 1.5");
          }
        });

        const seaLabels = [
          { name: "EAST SEA (동해)", coords: [129.8, 37.4], angle: -12 },
          { name: "WEST SEA (서해)", coords: [125.4, 36.6], angle: 8 },
          { name: "SOUTH SEA (남해)", coords: [128.1, 34.3], angle: 0 },
          { name: "DOKDO (독도)", coords: [131.86, 37.24], angle: 0 },
          { name: "ULLEUNGDO (울릉도)", coords: [130.90, 37.50], angle: 0 }
        ];

        seaLabels.forEach(s => {
          const pt = projection(s.coords);
          if (pt) {
            const g = decorGroup.append("g")
              .attr("transform", `translate(${pt[0]}, ${pt[1]}) rotate(${s.angle})`);

            g.append("text")
              .attr("text-anchor", "middle")
              .attr("font-family", "'Cinzel', 'Noto Serif KR', serif")
              .attr("font-size", s.name.includes("SEA") ? "13px" : "10px")
              .attr("font-weight", "700")
              .attr("letter-spacing", "2px")
              .attr("fill", "rgba(110, 85, 55, 0.38)")
              .text(s.name);
          }
        });

        const compassPt = [width - 65, 80];
        const cg = decorGroup.append("g")
          .attr("transform", `translate(${compassPt[0]}, ${compassPt[1]})`)
          .attr("opacity", 0.55);

        cg.append("circle").attr("r", 26).attr("fill", "none").attr("stroke", "#63482f").attr("stroke-width", 1).attr("stroke-dasharray", "2,2");
        cg.append("circle").attr("r", 22).attr("fill", "none").attr("stroke", "#63482f").attr("stroke-width", 0.7);

        cg.append("polygon").attr("points", "0,-22 4,-5 0,-2 -4,-5").attr("fill", "#841c1c");
        cg.append("polygon").attr("points", "0,22 4,5 0,2 -4,5").attr("fill", "#63482f");
        cg.append("polygon").attr("points", "-22,0 -5,-4 -2,0 -5,4").attr("fill", "#63482f");
        cg.append("polygon").attr("points", "22,0 5,-4 2,0 5,4").attr("fill", "#63482f");

        cg.append("text").attr("y", -25).attr("text-anchor", "middle").attr("font-family", "Cinzel").attr("font-size", "10px").attr("font-weight", "900").attr("fill", "#841c1c").text("N");
        cg.append("text").attr("y", 32).attr("text-anchor", "middle").attr("font-family", "Cinzel").attr("font-size", "9px").attr("font-weight", "700").attr("fill", "#63482f").text("S");
        cg.append("text").attr("x", 28).attr("y", 3).attr("text-anchor", "middle").attr("font-family", "Cinzel").attr("font-size", "9px").attr("font-weight", "700").attr("fill", "#63482f").text("E");
        cg.append("text").attr("x", -28).attr("y", 3).attr("text-anchor", "middle").attr("font-family", "Cinzel").attr("font-size", "9px").attr("font-weight", "700").attr("fill", "#63482f").text("W");
      }
    }

    function renderMarkersAndRoutes() {
      routeGroup.selectAll("*").remove();
      markerGroup.selectAll("*").remove();

      const dataset = currentRealm === 'domestic' ? DOMESTIC_SPOTS : OVERSEAS_SPOTS;
      const is3D = currentRealm === 'overseas' && currentProjectionType === '3d';
      const scaleFactor = is3D ? 1 : Math.max(0.48, Math.min(1.2, 1 / Math.pow(currentZoomScale, 0.78)));

      // 1. Draw Flight Routes
      if (currentRealm === 'overseas') {
        dataset.forEach(dest => {
          const isSelected = selectedSpot && selectedSpot.id === dest.id;
          const geoLine = { type: "LineString", coordinates: [SEOUL_COORDS, dest.coords] };
          const pData = pathGenerator(geoLine);
          if (pData) {
            routeGroup.append("path")
              .datum(geoLine)
              .attr("d", pData)
              .attr("fill", "none")
              .attr("stroke", isSelected ? "#841c1c" : "rgba(132, 28, 28, 0.35)")
              .attr("stroke-width", isSelected ? 1.8 : 0.8)
              .attr("class", isSelected ? "magic-flight-active" : "")
              .attr("filter", isSelected ? "url(#magicArcGlow)" : null)
              .attr("opacity", isSelected ? 0.95 : 0.5);
          }
        });
      } else {
        dataset.forEach(dest => {
          if (dest.id === 'seoul_all') return;
          const isSelected = selectedSpot && selectedSpot.id === dest.id;
          const geoLine = { type: "LineString", coordinates: [SEOUL_COORDS, dest.coords] };
          const pData = pathGenerator(geoLine);
          if (pData) {
            routeGroup.append("path")
              .datum(geoLine)
              .attr("d", pData)
              .attr("fill", "none")
              .attr("stroke", isSelected ? "#841c1c" : "rgba(180, 83, 9, 0.22)")
              .attr("stroke-width", isSelected ? 1.5 : 0.7)
              .attr("stroke-dasharray", isSelected ? "4,3" : "2,2")
              .attr("class", isSelected ? "magic-flight-active" : "");
          }
        });
      }

      // 2. Draw Pins, Leader Lines, and Labels
      dataset.forEach(dest => {
        const isSelected = selectedSpot && selectedSpot.id === dest.id;
        const coords = projection(dest.coords);
        if (!coords) return;

        if (is3D) {
          const center = projection.invert(projection.translate());
          if (center && d3.geoDistance(dest.coords, center) > Math.PI / 2) return;
        }

        const g = markerGroup.append("g")
          .attr("class", "cursor-pointer marker-node")
          .attr("data-ox", coords[0])
          .attr("data-oy", coords[1])
          .attr("transform", `translate(${coords[0]}, ${coords[1]}) scale(${scaleFactor})`)
          .style("pointer-events", "all")
          .on("click", (event) => {
            if (event.defaultPrevented) return;
            event.stopPropagation();
            selectSpot(dest);
          })
          .on("mouseenter", (e) => showTooltip(e, dest))
          .on("mouseleave", hideTooltip);

        // Click Hitbox
        g.append("circle")
          .attr("r", 20)
          .attr("fill", "transparent")
          .attr("stroke", "transparent")
          .style("cursor", "pointer");

        // Pulse Ring
        if (isSelected) {
          g.append("circle")
            .attr("r", 15)
            .attr("fill", "none")
            .attr("stroke", "#841c1c")
            .attr("stroke-width", 2.2)
            .attr("class", "magic-aura-pulse")
            .style("pointer-events", "none");
        }

        // Center Pin
        const isMilestone = dest.isMilestone;
        g.append("circle")
          .attr("r", isSelected ? 6.5 : (isMilestone ? 5.5 : 4.2))
          .attr("fill", isSelected ? "#841c1c" : (isMilestone ? "#c2410c" : "#7c2d12"))
          .attr("stroke", isMilestone ? "#fef3c7" : "#ffffff")
          .attr("stroke-width", isSelected ? 2 : 1.5)
          .style("cursor", "pointer");

        // Callout coordinates & Direction
        const callout = dest.callout || { dx: 12, dy: 4, textAnchor: "start" };
        const lOffset = { x: callout.dx, y: callout.dy };
        const anchor = callout.textAnchor || "start";

        // Leader Line (인출선): 핀에서 텍스트 시작점까지 얇은 양피지풍 점선 연결
        if (Math.abs(lOffset.x) > 6 || Math.abs(lOffset.y) > 6) {
          g.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", lOffset.x * 0.88)
            .attr("y2", lOffset.y * 0.88)
            .attr("stroke", isSelected ? "#841c1c" : "rgba(80, 50, 25, 0.45)")
            .attr("stroke-width", isSelected ? 1.4 : 1)
            .attr("stroke-dasharray", "2.5, 2")
            .style("pointer-events", "none");
        }

        let labelTitle = `${dest.flag} ${dest.nameKo}`;
        if (dest.milestoneCount) {
          labelTitle += ` [${dest.milestoneCount}]`;
        }

        const baseFontSize = isSelected ? 12 : (isMilestone ? 11 : 10.5);
        const foreColor = isSelected ? "#841c1c" : (isMilestone ? "#9a3412" : "#24170d");

        // Halo Outline for supreme legibility (배경 양피지와 대비되는 선명한 윤곽선)
        g.append("text")
          .attr("x", lOffset.x)
          .attr("y", lOffset.y)
          .attr("text-anchor", anchor)
          .attr("dominant-baseline", "central")
          .attr("fill", "#fbf7ee")
          .attr("stroke", "#fbf7ee")
          .attr("stroke-width", 4.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .style("paint-order", "stroke fill")
          .attr("font-size", `${baseFontSize}px`)
          .attr("font-weight", "900")
          .attr("font-family", "'Noto Serif KR', serif")
          .style("cursor", "pointer")
          .text(labelTitle);

        // Fore Text
        g.append("text")
          .attr("x", lOffset.x)
          .attr("y", lOffset.y)
          .attr("text-anchor", anchor)
          .attr("dominant-baseline", "central")
          .attr("fill", foreColor)
          .attr("font-size", `${baseFontSize}px`)
          .attr("font-weight", "900")
          .attr("font-family", "'Noto Serif KR', serif")
          .style("cursor", "pointer")
          .text(labelTitle);
      });
    }

    function selectSpot(spot, triggerFocus = true) {
      selectedSpot = spot;
      playWandWoosh();

      // Highlight card in carousel & scroll into view
      document.querySelectorAll(".dest-card").forEach(card => {
        if (card.getAttribute("data-id") === spot.id) {
          card.classList.add("ring-2", "ring-[#841c1c]", "bg-[#fffcf5]", "shadow-md");
          card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        } else {
          card.classList.remove("ring-2", "ring-[#841c1c]", "bg-[#fffcf5]", "shadow-md");
        }
      });

      // Populate Drawer
      const drawer = document.getElementById("travelDrawer");
      document.getElementById("drawerFlag").textContent = spot.flag;
      document.getElementById("drawerBadge").textContent = spot.badge || "호그와트 공인";
      document.getElementById("drawerMilestone").textContent = spot.milestone || "공식 기록";
      document.getElementById("drawerNameKo").textContent = spot.nameKo;
      document.getElementById("drawerNameEn").textContent = spot.nameEn;
      document.getElementById("drawerDesc").textContent = spot.desc;

      const spotsContainer = document.getElementById("drawerSpots");
      spotsContainer.innerHTML = (spot.spots || []).map(s => `
        <span class="px-1.5 py-0.5 bg-[#e4cfad] border border-[#523820] text-[#24170d] text-[10px] rounded-xs font-serif font-bold">
          ✦ ${s}
        </span>
      `).join("");

      const letterEl = document.getElementById("drawerLetterContent");
      letterEl.textContent = spot.letter || "“아직 작성된 현장 편지가 없습니다. [편지 쓰기/수정] 버튼을 눌러 소중한 기억을 남겨보세요.”";

      renderDrawerPhotos(spot);

      drawer.classList.remove("-translate-x-full", "opacity-0", "pointer-events-none");
      const backdrop = document.getElementById("drawerBackdrop");
      if (backdrop) {
        backdrop.classList.remove("opacity-0", "pointer-events-none");
        backdrop.classList.add("opacity-100", "pointer-events-auto");
      }

      if (triggerFocus) {
        if (currentRealm === 'overseas' && currentProjectionType === '3d') {
          stopAutoRotation(false);
          const targetRotation = [-spot.coords[0], -spot.coords[1]];
          d3.transition().duration(900).tween("rotate", () => {
            const r = d3.interpolate(projection.rotate(), targetRotation);
            return function(t) {
              currentRotation = r(t);
              projection.rotate(currentRotation);
              updatePaths();
            };
          });
        } else {
          const pt = projection(spot.coords);
          if (pt) {
            const transform = d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(currentRealm === 'domestic' ? 2.5 : (spot.zoomScale || 2.2))
              .translate(-pt[0], -pt[1]);
            svg.transition().duration(800).call(zoomBehavior.transform, transform);
          }
        }
      }

      renderMarkersAndRoutes();
    }

    // Lightbox & Overview state variables
    let currentLightboxSpot = null;
    let currentLightboxPhotos = [];
    let currentLightboxIndex = 0;
    let currentOverviewSpot = null;
    let currentOverviewPhotos = [];

    async function renderDrawerPhotos(spot) {
      const gallery = document.getElementById("drawerGalleryGrid");
      const subAlbumsContainer = document.getElementById("drawerSubAlbumsContainer");
      const countBadge = document.getElementById("photoCountBadge");
      const dbPhotos = await getPhotosFromDB(spot.id);
      const combined = [...(spot.photos || []), ...dbPhotos];
      countBadge.textContent = combined.length;

      // Handle sub-albums if spot has them (e.g. Bali: Ubud, Nusa Penida, Seminyak, Sapporo, Swiss)
      if (spot.subAlbums && spot.subAlbums.length > 0) {
        subAlbumsContainer.classList.remove("hidden");
        subAlbumsContainer.innerHTML = spot.subAlbums.map(album => {
          const albumPhotos = combined.filter(p => p.category === album.id);
          const count = albumPhotos.length;
          return `
            <div class="sub-album-card group cursor-pointer border-2 border-[#543b22] bg-[#fbf5e6] hover:bg-[#fffdf8] p-2 rounded-xs shadow hover:shadow-md transition-all hover:scale-[1.01] flex items-center gap-2.5 active:scale-[0.99]" data-category="${album.id}">
              <div class="w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden bg-[#24170d] border border-[#3b2513] rounded-xs relative shadow-inner">
                ${/\.mp4$/i.test(album.cover) ? `
                  <video src="${album.cover}#t=0.1" preload="metadata" muted playsinline loop onloadedmetadata="if(this.currentTime===0)this.currentTime=0.1;" class="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition duration-300"></video>
                ` : `
                  <img src="${album.cover}" alt="${album.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/100x100/3e2b19/f3e9d2?text=Daily+Prophet'">
                `}
                <span class="absolute bottom-0.5 right-0.5 px-1 bg-[#1a0f07]/85 text-[#fbf7ee] text-[8px] rounded-xs font-mono font-bold">
                  ${count}장
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <h5 class="text-xs font-headline font-black text-[#1f1309] truncate group-hover:text-[#841c1c] transition">
                    ${album.name}
                  </h5>
                  <span class="text-[9px] text-[#841c1c] font-cinzel font-bold shrink-0 group-hover:translate-x-0.5 transition">열람 ➔</span>
                </div>
                <p class="text-[10px] text-[#6d4d2f] font-serif truncate mt-0.5">${album.desc}</p>
                <div class="flex items-center gap-1.5 mt-1">
                  <span class="text-[8px] bg-[#3b2513]/10 text-[#543b22] px-1.5 py-0.2 rounded-xs font-mono font-bold">${album.tag}</span>
                  <span class="text-[8px] text-[#841c1c] font-serif font-bold">✦ 클릭 시 해당 앨범으로 바로 이동</span>
                </div>
              </div>
            </div>
          `;
        }).join("");

        subAlbumsContainer.querySelectorAll(".sub-album-card").forEach(card => {
          card.addEventListener("click", () => {
            const cat = card.getAttribute("data-category");
            openPhotoOverviewModal(spot, cat);
          });
        });
      } else {
        subAlbumsContainer.classList.remove("hidden");
        if (combined.length === 0) {
          subAlbumsContainer.innerHTML = `<div class="py-4 text-center text-xs text-[#735334] italic font-serif">등록된 현장 사진이 없습니다.</div>`;
        } else {
          const firstPhoto = combined[0];
          const isVideo = firstPhoto.type === 'video' || /\.mp4$/i.test(firstPhoto.url);
          subAlbumsContainer.innerHTML = `
            <div class="sub-album-card group cursor-pointer border-2 border-[#543b22] bg-[#fbf5e6] hover:bg-[#fffdf8] p-2 rounded-xs shadow hover:shadow-md transition-all hover:scale-[1.01] flex items-center gap-2.5 active:scale-[0.99]" data-category="all">
              <div class="w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden bg-[#24170d] border border-[#3b2513] rounded-xs relative shadow-inner">
                ${isVideo ? `
                  <video src="${firstPhoto.url}#t=0.1" preload="metadata" muted playsinline loop onloadedmetadata="if(this.currentTime===0)this.currentTime=0.1;" class="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition duration-300"></video>
                ` : `
                  <img src="${firstPhoto.url}" alt="${spot.nameKo}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://placehold.co/100x100/3e2b19/f3e9d2?text=Daily+Prophet'">
                `}
                <span class="absolute bottom-0.5 right-0.5 px-1 bg-[#1a0f07]/85 text-[#fbf7ee] text-[8px] rounded-xs font-mono font-bold">
                  ${combined.length}장
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <h5 class="text-xs font-headline font-black text-[#1f1309] truncate group-hover:text-[#841c1c] transition">
                    ${spot.nameKo} 사진첩
                  </h5>
                  <span class="text-[9px] text-[#841c1c] font-cinzel font-bold shrink-0 group-hover:translate-x-0.5 transition">열람 ➔</span>
                </div>
                <p class="text-[10px] text-[#6d4d2f] font-serif truncate mt-0.5">${spot.desc || '마법 보도 현장 사진 기록'}</p>
                <div class="flex items-center gap-1.5 mt-1">
                  <span class="text-[8px] bg-[#3b2513]/10 text-[#543b22] px-1.5 py-0.2 rounded-xs font-mono font-bold">${spot.badge || '📸 사진첩'}</span>
                  <span class="text-[8px] text-[#841c1c] font-serif font-bold">✦ 클릭 시 사진첩 열람</span>
                </div>
              </div>
            </div>
          `;
          subAlbumsContainer.querySelector(".sub-album-card").addEventListener("click", () => {
            openPhotoOverviewModal(spot, 'all');
          });
        }
      }

      // Hide individual photo grid inside drawer: photos are only viewed via overview modal upon clicking '열람'
      if (gallery) {
        gallery.innerHTML = "";
        gallery.classList.add("hidden");
      }
    }

    async function openPhotoOverviewModal(spot, targetCategory = null) {
      currentOverviewSpot = spot;
      const modal = document.getElementById("photoOverviewModal");
      const titleEl = document.getElementById("overviewModalTitle");
      const countEl = document.getElementById("overviewModalCount");
      const tabsEl = document.getElementById("overviewCategoryTabs");
      const gridEl = document.getElementById("overviewGalleryGrid");

      const dbPhotos = await getPhotosFromDB(spot.id);
      const combined = [...(spot.photos || []), ...dbPhotos];
      currentOverviewPhotos = combined;

      titleEl.textContent = `${spot.nameKo} 마법 보도 사진첩`;
      countEl.textContent = `전체 ${combined.length}장`;

      // 1. Category Tabs (for destinations with subAlbums)
      if (spot.subAlbums && spot.subAlbums.length > 0) {
        tabsEl.classList.remove("hidden");
        const isAllActive = !targetCategory || targetCategory === 'all';
        const tabsHtml = [
          `<button class="overview-tab-btn px-3 py-1 text-xs font-bold rounded-xs transition cursor-pointer shrink-0 ${isAllActive ? 'bg-[#841c1c] text-[#fbf7ee] shadow' : 'bg-[#fdf9f0] hover:bg-[#ede0c4] text-[#3b2513] border border-[#543b22]'}" data-cat="all">전체보기 (${combined.length})</button>`
        ];

        spot.subAlbums.forEach(album => {
          const catCount = combined.filter(p => p.category === album.id).length;
          const isActive = targetCategory === album.id;
          tabsHtml.push(`
            <button class="overview-tab-btn px-3 py-1 text-xs font-bold rounded-xs transition cursor-pointer shrink-0 ${isActive ? 'bg-[#841c1c] text-[#fbf7ee] shadow' : 'bg-[#fdf9f0] hover:bg-[#ede0c4] text-[#3b2513] border border-[#543b22]'}" data-cat="${album.id}">
              ${album.tag} (${catCount})
            </button>
          `);
        });

        tabsEl.innerHTML = tabsHtml.join("");

        tabsEl.querySelectorAll(".overview-tab-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const cat = btn.getAttribute("data-cat");
            tabsEl.querySelectorAll(".overview-tab-btn").forEach(b => {
              b.className = "overview-tab-btn px-3 py-1 text-xs font-bold rounded-xs transition cursor-pointer shrink-0 bg-[#fdf9f0] hover:bg-[#ede0c4] text-[#3b2513] border border-[#543b22]";
            });
            btn.className = "overview-tab-btn px-3 py-1 text-xs font-bold rounded-xs transition cursor-pointer shrink-0 bg-[#841c1c] text-[#fbf7ee] shadow";

            if (cat === "all") {
              gridEl.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              const sec = document.getElementById(`overview-section-${cat}`);
              if (sec) {
                sec.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          });
        });
      } else {
        tabsEl.classList.add("hidden");
        tabsEl.innerHTML = "";
      }

      // Helper for overview photo card rendering
      function renderOverviewCard(p) {
        return `
          <div class="overview-photo-card group cursor-pointer border-2 border-[#543b22]/70 hover:border-[#841c1c] bg-[#fbf5e6] rounded-xs overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.03] active:scale-[0.98] relative" data-gidx="${p.globalIdx}">
            <div class="aspect-square w-full bg-[#ecdcc2] overflow-hidden relative">
              <div class="absolute inset-0 flex items-center justify-center text-[#8c6b48]/30 text-xl font-bold select-none pointer-events-none">
                ${p.type === 'video' ? '🎬' : '📷'}
              </div>
              ${p.type === 'video' ? `
                <div class="w-full h-full relative bg-[#1b1008] flex items-center justify-center">
                  <video src="${p.url}#t=0.5" preload="metadata" muted playsinline loop onloadedmetadata="if(this.currentTime===0)this.currentTime=0.5;" class="w-full h-full object-cover pointer-events-none group-hover:scale-110 transition duration-300 relative z-1"></video>
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-2 bg-black/20 group-hover:bg-black/5 transition">
                    <span class="w-6 h-6 rounded-full bg-[#841c1c]/90 text-[#fbf7ee] flex items-center justify-center text-[10px] shadow border border-[#fbf7ee]/40 group-hover:scale-110 transition">▶</span>
                  </div>
                </div>
              ` : `
                <img src="${p.url}" alt="${p.caption}" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition duration-300 relative z-1" onerror="this.onerror=null; this.src='https://placehold.co/300x300/dfcaa5/3e2b19?text=데일리+예언자';">
              `}
              <span class="absolute top-1 left-1 px-1 py-0.2 bg-[#1b1008]/85 text-[#fbf7ee] text-[8px] font-mono font-bold rounded-xs flex items-center gap-0.5 shadow z-3">
                ${p.type === 'video' ? '▶ 영상' : '📸 사진'}
              </span>
              ${p.id ? `
                <button class="delete-photo-btn ${isAdminMode ? '' : 'hidden'} absolute top-1 right-1 w-5 h-5 bg-[#841c1c]/90 hover:bg-[#841c1c] text-[#fbf7ee] rounded-xs text-[10px] flex items-center justify-center shadow transition z-10" data-dbid="${p.id}" title="사진 삭제">🗑️</button>
              ` : ''}
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#140b04]/90 via-[#140b04]/60 to-transparent p-1 pt-3 opacity-90 group-hover:opacity-100 transition z-3">
                <p class="text-[9px] text-[#fbf7ee] font-serif truncate leading-tight">${p.caption}</p>
              </div>
            </div>
          </div>
        `;
      }

      // 2. Small Photos Grid Body
      if (combined.length === 0) {
        gridEl.innerHTML = `<div class="py-12 text-center text-sm text-[#735334] italic font-serif">등록된 현장 보도 사진이 없습니다.</div>`;
      } else if (spot.subAlbums && spot.subAlbums.length > 0) {
        let html = "";
        spot.subAlbums.forEach(album => {
          const albumPhotos = combined
            .map((p, idx) => ({ ...p, globalIdx: idx }))
            .filter(p => p.category === album.id);

          html += `
            <div id="overview-section-${album.id}" class="overview-category-section mb-6 scroll-mt-2">
              <div class="flex items-center justify-between border-b-2 border-[#543b22] pb-1.5 mb-2.5 sticky top-0 bg-[#f4ebd7]/95 backdrop-blur-xs z-10 py-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs sm:text-sm font-headline font-black text-[#1f1309]">${album.name}</span>
                  <span class="text-[10px] bg-[#841c1c] text-[#fbf7ee] font-mono px-1.5 py-0.5 rounded-xs font-bold">${albumPhotos.length}장</span>
                </div>
                <span class="text-[10px] text-[#6d4d2f] font-serif truncate max-w-[200px] sm:max-w-none">${album.desc}</span>
              </div>
              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                ${albumPhotos.length > 0 ? albumPhotos.map(renderOverviewCard).join("") : '<div class="col-span-full py-4 text-center text-xs text-[#735334]/80 italic font-serif">등록된 보도 사진이 없습니다. (사진을 추가해보세요!)</div>'}
              </div>
            </div>
          `;
        });

        // Other extra photos (e.g. uploaded via DB)
        const otherPhotos = combined
          .map((p, idx) => ({ ...p, globalIdx: idx }))
          .filter(p => !spot.subAlbums.some(a => a.id === p.category));

        if (otherPhotos.length > 0) {
          html += `
            <div id="overview-section-other" class="overview-category-section mb-6 scroll-mt-2">
              <div class="flex items-center justify-between border-b-2 border-[#543b22] pb-1.5 mb-2.5 sticky top-0 bg-[#f4ebd7]/95 backdrop-blur-xs z-10 py-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs sm:text-sm font-headline font-black text-[#1f1309]">추가 보도 기록</span>
                  <span class="text-[10px] bg-[#841c1c] text-[#fbf7ee] font-mono px-1.5 py-0.5 rounded-xs font-bold">${otherPhotos.length}장</span>
                </div>
                <span class="text-[10px] text-[#6d4d2f] font-serif">현장 특파원 추가 수집 사진</span>
              </div>
              <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                ${otherPhotos.map(renderOverviewCard).join("")}
              </div>
            </div>
          `;
        }

        gridEl.innerHTML = html;
      } else {
        // Plain grid for non-subalbum spots
        const allPhotosWithIdx = combined.map((p, idx) => ({ ...p, globalIdx: idx }));
        gridEl.innerHTML = `
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            ${allPhotosWithIdx.map(renderOverviewCard).join("")}
          </div>
        `;
      }

      // Card click events -> open 2nd step scrollable lightbox & hover preview
      gridEl.querySelectorAll(".overview-photo-card").forEach(card => {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".delete-photo-btn")) return;
          const gidx = parseInt(card.getAttribute("data-gidx"), 10);
          openScrollablePhotoLightbox(spot, combined, gidx);
        });
        const v = card.querySelector("video");
        if (v) {
          card.addEventListener("mouseenter", () => v.play().catch(() => {}));
          card.addEventListener("mouseleave", () => {
            v.pause();
            v.currentTime = 0.1;
          });
        }
      });

      // Handle delete photo inside overview modal
      gridEl.querySelectorAll(".delete-photo-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const dbId = parseInt(btn.getAttribute("data-dbid"), 10);
          if (dbId) {
            await deletePhotoFromDB(dbId);
            showToast("보도 사진이 삭제되었습니다.");
            openPhotoOverviewModal(spot, targetCategory);
            renderDrawerPhotos(spot);
          }
        });
      });

      // Display overview modal
      modal.classList.remove("hidden");

      // Auto-scroll to target category if specified (e.g. 'seminyak')
      if (targetCategory && targetCategory !== 'all') {
        setTimeout(() => {
          const targetSection = document.getElementById(`overview-section-${targetCategory}`);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
      } else {
        gridEl.scrollTop = 0;
      }
    }

    function openScrollablePhotoLightbox(spot, photos, startIndex = 0) {
      if (!photos || photos.length === 0) return;
      currentLightboxSpot = spot;
      currentLightboxPhotos = photos;
      currentLightboxIndex = Math.max(0, Math.min(startIndex, photos.length - 1));

      const lb = document.getElementById("photoLightbox");
      const titleEl = document.getElementById("lightboxPlaceTitle");
      const badgeEl = document.getElementById("lightboxCounterBadge");
      const track = document.getElementById("lightboxScrollTrack");
      const rail = document.getElementById("lightboxThumbRail");

      titleEl.textContent = spot.nameKo;
      badgeEl.textContent = `${currentLightboxIndex + 1} / ${photos.length}`;

      // Build slides
      track.innerHTML = photos.map((p, idx) => `
        <div class="lightbox-slide w-full h-full shrink-0 flex flex-col items-center justify-center p-2 sm:p-4 snap-center select-none" data-slide-idx="${idx}">
          <div class="relative max-w-full max-h-[64vh] sm:max-h-[68vh] flex items-center justify-center">
            ${p.type === 'video' ? `
              <video src="${p.url}" controls playsinline preload="metadata" class="max-w-full max-h-[64vh] sm:max-h-[68vh] object-contain rounded-sm shadow-2xl border-2 border-[#543b22] bg-black">
              </video>
            ` : `
              <img src="${p.url}" alt="${p.caption}" class="max-w-full max-h-[64vh] sm:max-h-[68vh] object-contain rounded-sm shadow-2xl border-2 border-[#543b22]" onerror="this.src='https://placehold.co/600x400/3e2b19/f3e9d2?text=Daily+Prophet'">
            `}
          </div>
          <div class="mt-2 px-3 py-1 bg-[#2b1a0e]/95 text-[#fbf5e6] text-xs font-serif rounded-xs border border-[#8b6b44]/40 max-w-xl text-center shadow">
            <p class="font-headline font-bold text-[11px] sm:text-xs text-[#fbf5e6] truncate">${p.caption}</p>
            <span class="text-[9px] text-[#c9933b] font-mono">${idx + 1} / ${photos.length}번째 보도 기록</span>
          </div>
        </div>
      `).join("");

      // Build bottom thumbnail rail
      rail.innerHTML = photos.map((p, idx) => `
        <button class="lightbox-rail-thumb shrink-0 w-10 h-10 sm:w-12 sm:h-12 border-2 ${idx === currentLightboxIndex ? 'border-[#c9933b] ring-2 ring-[#841c1c] scale-105 opacity-100' : 'border-[#543b22]/70 opacity-60 hover:opacity-100'} rounded-xs overflow-hidden transition cursor-pointer relative bg-[#dfcaa5]" data-rail-idx="${idx}">
          ${p.type === 'video' ? `
            <video src="${p.url}#t=0.5" preload="metadata" muted playsinline onloadedmetadata="if(this.currentTime===0)this.currentTime=0.5;" class="w-full h-full object-cover pointer-events-none"></video>
            <span class="absolute inset-0 flex items-center justify-center bg-black/35 text-[9px] text-white font-bold">▶</span>
          ` : `
            <img src="${p.url}" alt="" decoding="async" class="w-full h-full object-cover pointer-events-none" onerror="this.onerror=null; this.src='https://placehold.co/100x100/dfcaa5/3e2b19?text=📷';">
          `}
        </button>
      `).join("");

      rail.querySelectorAll(".lightbox-rail-thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
          const idx = parseInt(thumb.getAttribute("data-rail-idx"), 10);
          scrollToLightboxSlide(idx, true);
        });
      });

      lb.classList.remove("hidden");

      setTimeout(() => {
        scrollToLightboxSlide(currentLightboxIndex, false);
      }, 50);
    }

    function scrollToLightboxSlide(targetIdx, smooth = true) {
      const track = document.getElementById("lightboxScrollTrack");
      const slides = track.querySelectorAll(".lightbox-slide");
      if (!slides || slides.length === 0) return;
      
      const idx = Math.max(0, Math.min(targetIdx, slides.length - 1));
      currentLightboxIndex = idx;

      const slide = slides[idx];
      if (slide) {
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: smooth ? "smooth" : "auto"
        });
      }

      updateLightboxUI(idx);
    }

    function updateLightboxUI(idx) {
      const photos = currentLightboxPhotos;
      if (!photos || photos.length === 0) return;

      const badgeEl = document.getElementById("lightboxCounterBadge");
      badgeEl.textContent = `${idx + 1} / ${photos.length}`;

      const rail = document.getElementById("lightboxThumbRail");
      rail.querySelectorAll(".lightbox-rail-thumb").forEach((thumb, tIdx) => {
        if (tIdx === idx) {
          thumb.className = "lightbox-rail-thumb shrink-0 w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#c9933b] ring-2 ring-[#841c1c] scale-105 opacity-100 rounded-xs overflow-hidden transition cursor-pointer relative";
          thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        } else {
          thumb.className = "lightbox-rail-thumb shrink-0 w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#543b22]/70 opacity-60 hover:opacity-100 rounded-xs overflow-hidden transition cursor-pointer relative";
        }
      });

      // Pause non-active videos
      const track = document.getElementById("lightboxScrollTrack");
      track.querySelectorAll("video").forEach((video, vIdx) => {
        if (vIdx !== idx && !video.paused) {
          video.pause();
        }
      });
    }

    // Lightbox scroll & wheel event listeners
    let lightboxScrollTimeout = null;
    const lightboxTrack = document.getElementById("lightboxScrollTrack");
    lightboxTrack.addEventListener("scroll", () => {
      clearTimeout(lightboxScrollTimeout);
      lightboxScrollTimeout = setTimeout(() => {
        const slideWidth = lightboxTrack.clientWidth;
        if (slideWidth > 0 && currentLightboxPhotos.length > 0) {
          const newIdx = Math.round(lightboxTrack.scrollLeft / slideWidth);
          if (newIdx !== currentLightboxIndex && newIdx >= 0 && newIdx < currentLightboxPhotos.length) {
            currentLightboxIndex = newIdx;
            updateLightboxUI(newIdx);
          }
        }
      }, 60);
    });

    lightboxTrack.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        lightboxTrack.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // Lightbox Controls
    document.getElementById("lightboxPrevBtn").addEventListener("click", () => {
      scrollToLightboxSlide(currentLightboxIndex - 1, true);
    });

    document.getElementById("lightboxNextBtn").addEventListener("click", () => {
      scrollToLightboxSlide(currentLightboxIndex + 1, true);
    });

    document.getElementById("lightboxBackToGridBtn").addEventListener("click", () => {
      document.getElementById("photoLightbox").classList.add("hidden");
      document.getElementById("lightboxScrollTrack").querySelectorAll("video").forEach(v => v.pause());
      const overviewModal = document.getElementById("photoOverviewModal");
      overviewModal.classList.remove("hidden");
      const targetCard = overviewModal.querySelector(`[data-gidx="${currentLightboxIndex}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        targetCard.classList.add("ring-2", "ring-[#841c1c]");
        setTimeout(() => targetCard.classList.remove("ring-2", "ring-[#841c1c]"), 1500);
      }
    });

    document.getElementById("closeLightboxBtn").addEventListener("click", () => {
      document.getElementById("photoLightbox").classList.add("hidden");
      document.getElementById("lightboxScrollTrack").querySelectorAll("video").forEach(v => v.pause());
    });

    document.getElementById("photoLightbox").addEventListener("click", (e) => {
      if (e.target.id === "photoLightbox") {
        document.getElementById("photoLightbox").classList.add("hidden");
        document.getElementById("lightboxScrollTrack").querySelectorAll("video").forEach(v => v.pause());
      }
    });

    // Overview Modal Controls
    document.getElementById("closePhotoOverviewBtn").addEventListener("click", () => {
      document.getElementById("photoOverviewModal").classList.add("hidden");
    });

    document.getElementById("photoOverviewModal").addEventListener("click", (e) => {
      if (e.target.id === "photoOverviewModal") {
        document.getElementById("photoOverviewModal").classList.add("hidden");
      }
    });

    // Open Overview Modal from Travel Drawer Header Button
    const openAllPhotosBtn = document.getElementById("openAllPhotosBtn");
    if (openAllPhotosBtn) {
      openAllPhotosBtn.addEventListener("click", () => {
        if (selectedSpot) {
          openPhotoOverviewModal(selectedSpot, 'all');
        }
      });
    }

    const overviewEditPhotosBtn = document.getElementById("overviewEditPhotosBtn");
    if (overviewEditPhotosBtn) {
      overviewEditPhotosBtn.addEventListener("click", () => {
        if (isAdminMode) {
          openAddMediaModal();
        } else {
          pendingAdminAction = 'addMedia';
          document.getElementById("adminPasswordInput").value = "";
          document.getElementById("adminAuthError").classList.add("hidden");
          document.getElementById("adminAuthModal").classList.remove("hidden");
          document.getElementById("adminPasswordInput").focus();
        }
      });
    }

    // Keyboard Navigation for Lightbox & Overview
    window.addEventListener("keydown", (e) => {
      const lb = document.getElementById("photoLightbox");
      const overview = document.getElementById("photoOverviewModal");
      
      if (!lb.classList.contains("hidden")) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollToLightboxSlide(currentLightboxIndex - 1, true);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollToLightboxSlide(currentLightboxIndex + 1, true);
        } else if (e.key === "Escape") {
          e.preventDefault();
          lb.classList.add("hidden");
          document.getElementById("lightboxScrollTrack").querySelectorAll("video").forEach(v => v.pause());
        }
      } else if (!overview.classList.contains("hidden")) {
        if (e.key === "Escape") {
          e.preventDefault();
          overview.classList.add("hidden");
        }
      } else {
        const drawer = document.getElementById("travelDrawer");
        if (e.key === "Escape" && drawer && !drawer.classList.contains("-translate-x-full")) {
          e.preventDefault();
          closeDrawer();
        }
      }
    });

    function closeDrawer() {
      const drawer = document.getElementById("travelDrawer");
      const backdrop = document.getElementById("drawerBackdrop");
      if (backdrop) {
        backdrop.classList.remove("opacity-100", "pointer-events-auto");
        backdrop.classList.add("opacity-0", "pointer-events-none");
      }
      if (!drawer || drawer.classList.contains("-translate-x-full")) return;
      drawer.classList.add("-translate-x-full", "opacity-0", "pointer-events-none");
      selectedSpot = null;
      document.querySelectorAll(".dest-card").forEach(c => {
        c.classList.remove("ring-2", "ring-[#841c1c]", "bg-[#fffcf5]", "shadow-md");
      });
      renderMarkersAndRoutes();
    }

    document.getElementById("closeDrawerBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      closeDrawer();
    });

    const drawerBackdrop = document.getElementById("drawerBackdrop");
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    function buildCarousel() {
      const carousel = document.getElementById("destCarousel");
      const titleEl = document.getElementById("carouselHeaderTitle");
      const countEl = document.getElementById("carouselCountBadge");
      const dataset = currentRealm === 'domestic' ? DOMESTIC_SPOTS : OVERSEAS_SPOTS;

      if (currentRealm === 'domestic') {
        titleEl.textContent = "호그와트 & 호그스미드 근교 마법 여정 전면 색인";
        if (countEl) {
          countEl.textContent = "";
          countEl.classList.add("hidden");
        }
      } else {
        titleEl.textContent = "국제 포트키 대원정 해외 여정 전면 색인";
        if (countEl) {
          countEl.classList.remove("hidden");
          countEl.textContent = `● ${dataset.length} Spots`;
        }
      }

      carousel.innerHTML = dataset.map(s => `
        <div class="dest-card shrink-0 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-sm bg-[#fbf5e6] hover:bg-[#fffcf5] border sm:border-2 border-[#543b22] cursor-pointer shadow transition-all duration-150 min-w-[125px] sm:min-w-[140px]" data-id="${s.id}">
          <div class="flex items-center justify-between gap-1 mb-0.5 border-b border-[#3b2513]/20 pb-0.5">
            <span class="text-sm sm:text-base">${s.flag}</span>
            <span class="text-[7.5px] sm:text-[8.5px] px-1 py-0.2 bg-[#841c1c] text-[#fbf7ee] font-bold rounded-xs leading-none">${s.badge}</span>
          </div>
          <div class="font-headline font-bold text-[9px] sm:text-xs text-[#201308] truncate leading-tight mt-0.5">${s.nameKo}</div>
          <div class="text-[8px] sm:text-[9.5px] text-[#63482f] font-serif truncate mt-0.5">📍 ${s.milestone}</div>
        </div>
      `).join("");

      carousel.querySelectorAll(".dest-card").forEach(c => {
        c.addEventListener("click", (e) => {
          e.stopPropagation();
          const target = dataset.find(d => d.id === c.getAttribute("data-id"));
          if (target) selectSpot(target);
        });
      });
    }

    function initCarouselDragScroll() {
      const carousel = document.getElementById("destCarousel");
      if (!carousel) return;

      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let isDragging = false;
      let hasDragged = false;

      carousel.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return; // 마우스 왼쪽 버튼만
        isDown = true;
        isDragging = false;
        hasDragged = false;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const x = e.pageX - carousel.offsetLeft;
        const walk = x - startX;

        if (Math.abs(walk) > 10) {
          isDragging = true;
          hasDragged = true;
          carousel.classList.add("is-dragging");
          e.preventDefault();
        }

        if (isDragging) {
          carousel.scrollLeft = scrollLeft - walk;
        }
      });

      const endDrag = () => {
        if (!isDown) return;
        isDown = false;
        carousel.classList.remove("is-dragging");

        if (hasDragged) {
          // 드래그 직후 발생하는 click 이벤트 방지
          const preventClickOnce = (clickEvent) => {
            clickEvent.stopImmediatePropagation();
            clickEvent.preventDefault();
            window.removeEventListener("click", preventClickOnce, true);
          };
          window.addEventListener("click", preventClickOnce, true);
          setTimeout(() => {
            window.removeEventListener("click", preventClickOnce, true);
            hasDragged = false;
            isDragging = false;
          }, 80);
        }
      };

      window.addEventListener("mouseup", endDrag);

      // 마우스 휠로도 가로 스크롤 지원
      carousel.addEventListener("wheel", (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          carousel.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }

    // Realm Tab Switcher
    const tabDomesticBtn = document.getElementById("tabDomesticBtn");
    const tabOverseasBtn = document.getElementById("tabOverseasBtn");
    const headerSubNotice = document.getElementById("headerSubNotice");

    tabDomesticBtn.addEventListener("click", () => {
      if (currentRealm === 'domestic') return;
      currentRealm = 'domestic';
      tabDomesticBtn.className = "realm-tab-btn px-3 py-1 text-xs font-black rounded-sm bg-[#3b2513] text-[#fbf7ee] shadow transition flex items-center gap-1.5";
      tabOverseasBtn.className = "realm-tab-btn px-3 py-1 text-xs font-bold rounded-sm text-[#4a331c] hover:bg-[#cbaf80] transition flex items-center gap-1.5";
      headerSubNotice.textContent = "호그와트 & 호그스미드 근교 마법 여정 총괄";
      closeDrawer();
      currentZoomScale = 1;
      buildCarousel();
      initProjection('2d');
      playMagicChime();
      showToast("🚂 국내 마법 구역으로 시점을 전환했습니다.");
    });

    tabOverseasBtn.addEventListener("click", () => {
      if (currentRealm === 'overseas') return;
      currentRealm = 'overseas';
      tabOverseasBtn.className = "realm-tab-btn px-3 py-1 text-xs font-black rounded-sm bg-[#3b2513] text-[#fbf7ee] shadow transition flex items-center gap-1.5";
      tabDomesticBtn.className = "realm-tab-btn px-3 py-1 text-xs font-bold rounded-sm text-[#4a331c] hover:bg-[#cbaf80] transition flex items-center gap-1.5";
      headerSubNotice.textContent = "국제 포트키 원정대 해외 특파 일지";
      closeDrawer();
      currentZoomScale = 1;
      buildCarousel();
      initProjection(currentProjectionType);
      playMagicChime();
      showToast("🧹 대륙 간 국제 포트키 항로로 시점을 전환했습니다.");
    });

    // Tooltip
    const tooltip = document.getElementById("mapTooltip");
    const tooltipIcon = document.getElementById("tooltipIcon");
    const tooltipTitle = document.getElementById("tooltipTitle");
    const tooltipSub = document.getElementById("tooltipSub");

    function showTooltip(event, spot) {
      tooltipIcon.textContent = spot.flag;
      tooltipTitle.textContent = `${spot.nameKo} [${spot.badge}]`;
      tooltipSub.textContent = spot.milestone || spot.desc.substring(0, 30) + "...";
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY - 14}px`;
      tooltip.classList.remove("hidden");
    }

    function hideTooltip() {
      tooltip.classList.add("hidden");
    }

    function showToast(msg) {
      const toast = document.getElementById("toast");
      toast.textContent = msg;
      toast.classList.remove("opacity-0");
      setTimeout(() => toast.classList.add("opacity-0"), 2600);
    }

    // View Projection Buttons (2D vs 3D)
    document.querySelectorAll(".proj-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".proj-btn").forEach(b => {
          b.className = "proj-btn px-2.5 py-1 text-xs font-bold rounded-sm bg-[#dfcaa5] hover:bg-[#cbaf80] text-[#342211] transition";
        });
        e.target.className = "proj-btn px-2.5 py-1 text-xs font-black rounded-sm bg-[#3b2513] text-[#fbf7ee] shadow transition";
        currentZoomScale = 1;
        initProjection(e.target.getAttribute("data-proj"));
      });
    });

    document.getElementById("autoRotateBtn").addEventListener("click", () => {
      if (isAutoRotating) stopAutoRotation(true);
      else startAutoRotation();
    });

    document.getElementById("zoomInBtn").addEventListener("click", () => {
      if (currentRealm === 'overseas' && currentProjectionType === '3d') {
        projection.scale(projection.scale() * 1.3);
        updatePaths();
      } else {
        svg.transition().duration(260).call(zoomBehavior.scaleBy, 1.35);
      }
    });

    document.getElementById("zoomOutBtn").addEventListener("click", () => {
      if (currentRealm === 'overseas' && currentProjectionType === '3d') {
        projection.scale(projection.scale() / 1.3);
        updatePaths();
      } else {
        svg.transition().duration(260).call(zoomBehavior.scaleBy, 0.75);
      }
    });

    document.getElementById("resetViewBtn").addEventListener("click", () => {
      if (currentRealm === 'overseas' && currentProjectionType === '3d') {
        currentRotation = [-127, -25];
        initProjection("3d");
      } else {
        currentZoomScale = 1;
        svg.transition().duration(400).call(zoomBehavior.transform, d3.zoomIdentity);
      }
    });

    const maraudersOverlay = document.getElementById("maraudersOverlay");
    const marauderTeaser = document.getElementById("marauderTeaser");
    const marauderSpell = document.getElementById("marauderSpell");
    const marauderCloseSpell = document.getElementById("marauderCloseSpell");
    const hideMapBtn = document.getElementById("hideMapBtn");
    const inkVeilCanvas = document.getElementById("inkVeilCanvas");
    const inkVeilHint = document.getElementById("inkVeilHint");
    let isMapRevealed = false;
    let isInkVeilActive = false;
    const SCRATCH_GRID_COLS = 40;
    const SCRATCH_GRID_ROWS = 30;
    const TOTAL_SCRATCH_CELLS = SCRATCH_GRID_COLS * SCRATCH_GRID_ROWS;
    let scratchGrid = new Uint8Array(TOTAL_SCRATCH_CELLS);
    let scratchClearedCount = 0;

    function resetInkVeil() {
      if (!inkVeilCanvas || !containerEl) return;
      const rect = containerEl.getBoundingClientRect();
      inkVeilCanvas.width = rect.width;
      inkVeilCanvas.height = rect.height;
      const ctx = inkVeilCanvas.getContext("2d");
      
      ctx.fillStyle = "#dfcaa5";
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "rgba(70, 45, 15, 0.08)";
      for (let i = 0; i < 700; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        ctx.fillRect(x, y, 2, 2);
      }

      inkVeilCanvas.style.opacity = "1";
      inkVeilCanvas.style.pointerEvents = "auto";
      inkVeilCanvas.style.touchAction = "none";
      inkVeilCanvas.classList.remove("hidden");
      if (inkVeilHint) {
        inkVeilHint.style.opacity = "1";
        inkVeilHint.classList.remove("hidden");
      }

      scratchGrid.fill(0);
      scratchClearedCount = 0;
      isInkVeilActive = true;
    }

    function revealInkAt(clientX, clientY) {
      if (!isInkVeilActive || !inkVeilCanvas) return;
      const rect = inkVeilCanvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const ctx = inkVeilCanvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      const brushRadius = Math.max(55, Math.min(rect.width, rect.height) / 7.2);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
      grad.addColorStop(0, "rgba(0, 0, 0, 1)");
      grad.addColorStop(0.7, "rgba(0, 0, 0, 0.9)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const cellWidth = rect.width / SCRATCH_GRID_COLS;
      const cellHeight = rect.height / SCRATCH_GRID_ROWS;
      const radiusSq = brushRadius * brushRadius;

      const minCol = Math.max(0, Math.floor((x - brushRadius) / cellWidth));
      const maxCol = Math.min(SCRATCH_GRID_COLS - 1, Math.floor((x + brushRadius) / cellWidth));
      const minRow = Math.max(0, Math.floor((y - brushRadius) / cellHeight));
      const maxRow = Math.min(SCRATCH_GRID_ROWS - 1, Math.floor((y + brushRadius) / cellHeight));

      for (let r = minRow; r <= maxRow; r++) {
        const cy = (r + 0.5) * cellHeight;
        for (let c = minCol; c <= maxCol; c++) {
          const idx = r * SCRATCH_GRID_COLS + c;
          if (scratchGrid[idx] === 0) {
            const cx = (c + 0.5) * cellWidth;
            const distSq = (cx - x) * (cx - x) + (cy - y) * (cy - y);
            if (distSq <= radiusSq) {
              scratchGrid[idx] = 1;
              scratchClearedCount++;
            }
          }
        }
      }

      const ratio = scratchClearedCount / TOTAL_SCRATCH_CELLS;

      if (ratio >= 0.70 && isInkVeilActive) {
        isInkVeilActive = false;
        inkVeilCanvas.style.pointerEvents = "none";
        if (inkVeilHint) {
          inkVeilHint.style.opacity = "0";
          setTimeout(() => inkVeilHint.classList.add("hidden"), 600);
        }
        inkVeilCanvas.style.opacity = "0";
        playMagicChime();
        showToast("✨ 마법 양피지가 걷히며 지도가 완전히 드러났습니다!");
        setTimeout(() => {
          inkVeilCanvas.classList.add("hidden");
        }, 1000);
      }
    }

    function handleVeilScratch(e) {
      if (!isInkVeilActive || !isMapRevealed) return;
      if (e.touches && e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          revealInkAt(e.touches[i].clientX, e.touches[i].clientY);
        }
      } else {
        revealInkAt(e.clientX, e.clientY);
      }
    }

    if (inkVeilCanvas) {
      inkVeilCanvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleVeilScratch(e);
      }, { passive: false });

      inkVeilCanvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        handleVeilScratch(e);
      }, { passive: false });

      inkVeilCanvas.addEventListener("pointerdown", (e) => {
        handleVeilScratch(e);
      });

      inkVeilCanvas.addEventListener("pointermove", (e) => {
        handleVeilScratch(e);
      });
    }

    if (containerEl) {
      containerEl.addEventListener("mousemove", (e) => {
        if (isMapRevealed && isInkVeilActive) {
          revealInkAt(e.clientX, e.clientY);
        }
      });
    }

    function revealMaraudersMap() {
      if (isMapRevealed) return;
      isMapRevealed = true;
      playMagicChime();
      resetInkVeil();
      marauderTeaser.classList.add("hidden");
      if (marauderCloseSpell) marauderCloseSpell.classList.add("hidden");
      marauderSpell.classList.remove("hidden");

      setTimeout(() => {
        maraudersOverlay.classList.add("opacity-0", "scale-105", "pointer-events-none");
        showToast("🪄 마법의 지도가 완벽하게 펼쳐졌습니다!");
      }, 1600);

      setTimeout(() => {
        maraudersOverlay.classList.add("hidden");
      }, 3600);
    }

    function concealMaraudersMap() {
      if (!isMapRevealed) return;
      isMapRevealed = false;
      playWandWoosh();
      closeDrawer();

      if (inkVeilCanvas) {
        inkVeilCanvas.style.pointerEvents = "none";
      }

      maraudersOverlay.classList.remove("hidden");
      maraudersOverlay.classList.add("opacity-0", "scale-105");
      maraudersOverlay.classList.remove("pointer-events-none");
      marauderTeaser.classList.add("hidden");
      marauderSpell.classList.add("hidden");
      if (marauderCloseSpell) marauderCloseSpell.classList.remove("hidden");

      void maraudersOverlay.offsetHeight;
      requestAnimationFrame(() => {
        maraudersOverlay.classList.remove("opacity-0", "scale-105");
        maraudersOverlay.classList.add("opacity-100", "scale-100");
      });

      showToast("📜 마법의 장난 끝! (Mischief Managed)");
      resetInkVeil();
      setTimeout(() => {
        if (!isMapRevealed) {
          if (marauderCloseSpell) marauderCloseSpell.classList.add("hidden");
          marauderTeaser.classList.remove("hidden");
        }
      }, 2500);
    }

    maraudersOverlay.addEventListener("click", revealMaraudersMap);
    hideMapBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      concealMaraudersMap();
    });

    document.getElementById("flySimBtn").addEventListener("click", () => {
      if (!selectedSpot) return;
      stopAutoRotation(false);
      planeSimGroup.selectAll("*").remove();

      const startPt = SEOUL_COORDS;
      const endPt = selectedSpot.coords;
      const interpolator = d3.geoInterpolate(startPt, endPt);

      showToast(`🧹 ${selectedSpot.nameKo} 빗자루 비행 항로를 추적합니다!`);

      const plane = planeSimGroup.append("g");
      plane.append("circle").attr("r", 9).attr("fill", "rgba(132, 28, 28, 0.35)").attr("class", "magic-aura-pulse");
      plane.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", "15px").text("🧹");

      const duration = 2200;
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const curr = interpolator(t);

        if (currentRealm === 'overseas' && currentProjectionType === '3d') {
          currentRotation = [-curr[0], -curr[1]];
          projection.rotate(currentRotation);
          updatePaths();
        }

        const pos = projection(curr);
        if (pos) plane.attr("transform", `translate(${pos[0]}, ${pos[1]})`);

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          plane.transition().duration(600).style("opacity", 0).remove();
          playMagicChime();
          showToast(`🛬 ${selectedSpot.nameKo} 안전 도착!`);
        }
      }
      requestAnimationFrame(step);
    });

    document.getElementById("copyTripBtn").addEventListener("click", () => {
      if (!selectedSpot) return;
      const text = `[예언자 일보 특별 스크랩 - ${selectedSpot.nameKo}]\n• 공식 기록: ${selectedSpot.milestone}\n• 마법 탐방기: ${selectedSpot.desc}\n• 현장 편지: ${selectedSpot.letter}`;
      
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast("양피지 기록이 클립보드에 복사되었습니다.");
    });

    const searchInput = document.getElementById("spotSearch");
    const searchDropdown = document.getElementById("searchDropdown");
    const clearSearchBtn = document.getElementById("clearSearchBtn");

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchDropdown.classList.add("hidden");
        clearSearchBtn.classList.add("hidden");
        return;
      }
      clearSearchBtn.classList.remove("hidden");

      const allSpots = [...DOMESTIC_SPOTS, ...OVERSEAS_SPOTS];
      const filtered = allSpots.filter(s => 
        s.nameKo.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.milestone.toLowerCase().includes(q) ||
        (s.spots && s.spots.some(sp => sp.toLowerCase().includes(q))) ||
        s.desc.toLowerCase().includes(q)
      );

      if (filtered.length === 0) {
        searchDropdown.innerHTML = `<div class="p-2 text-xs text-[#63482f] text-center italic">“${e.target.value}” 관련 기록을 찾을 수 없습니다.</div>`;
      } else {
        searchDropdown.innerHTML = filtered.map(s => {
          const isDom = DOMESTIC_SPOTS.some(d => d.id === s.id);
          return `
            <div class="search-item px-3 py-2 text-xs flex items-center justify-between hover:bg-[#e4d4b6] cursor-pointer border-b border-[#3b2513]/10 last:border-0 transition" data-id="${s.id}" data-realm="${isDom ? 'domestic' : 'overseas'}">
              <div class="flex items-center gap-2">
                <span class="text-base">${s.flag}</span>
                <div>
                  <span class="font-bold text-[#201308]">${s.nameKo}</span>
                  <span class="text-[#841c1c] text-[10px] ml-1">[${s.badge}]</span>
                  <div class="text-[10px] text-[#6d4d2f] truncate max-w-[190px]">${s.milestone}</div>
                </div>
              </div>
              <span class="px-1.5 py-0.5 bg-[#841c1c] text-[#fbf7ee] text-[9px] font-bold rounded-xs shrink-0">${isDom ? '국내' : '해외'}</span>
            </div>
          `;
        }).join("");

        searchDropdown.querySelectorAll(".search-item").forEach(item => {
          item.addEventListener("click", (e) => {
            e.stopPropagation();
            const destId = item.getAttribute("data-id");
            const realm = item.getAttribute("data-realm");

            if (realm !== currentRealm) {
              if (realm === 'domestic') tabDomesticBtn.click();
              else tabOverseasBtn.click();
            }

            const target = (realm === 'domestic' ? DOMESTIC_SPOTS : OVERSEAS_SPOTS).find(d => d.id === destId);
            if (target) selectSpot(target);

            searchDropdown.classList.add("hidden");
            searchInput.value = target.nameKo;
          });
        });
      }
      searchDropdown.classList.remove("hidden");
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.classList.add("hidden");
      searchDropdown.classList.add("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add("hidden");
      }
      const drawer = document.getElementById("travelDrawer");
      if (drawer && !drawer.classList.contains("-translate-x-full") && !drawer.contains(e.target)) {
        if (
          e.target.closest("#destCarouselContainer") ||
          e.target.closest("#destCarousel") ||
          e.target.closest(".dest-card") ||
          e.target.closest("#spotSearch") ||
          e.target.closest("#searchDropdown") ||
          e.target.closest("#adminToggleBtn") ||
          e.target.closest("#photoLightbox") ||
          e.target.closest("#photoOverviewModal") ||
          e.target.closest("#adminAuthModal") ||
          e.target.closest("#addMediaModal") ||
          e.target.closest("#letterModal") ||
          e.target.closest("#maraudersOverlay")
        ) {
          return;
        }
        closeDrawer();
      }
    });

    let pendingAdminAction = null;

    function openAddMediaModal() {
      if (!selectedSpot) {
        showToast("먼저 여행지를 선택해주세요.");
        return;
      }
      const categorySelectWrap = document.getElementById("mediaCategorySelectWrap");
      const categorySelect = document.getElementById("mediaCategorySelect");
      if (categorySelectWrap && categorySelect) {
        if (selectedSpot.subAlbums && selectedSpot.subAlbums.length > 0) {
          categorySelectWrap.classList.remove("hidden");
          categorySelect.innerHTML = selectedSpot.subAlbums.map(a => `
            <option value="${a.id}">${a.name} (${a.tag})</option>
          `).join("");
        } else {
          categorySelectWrap.classList.add("hidden");
          categorySelect.innerHTML = `<option value="">기본 앨범</option>`;
        }
      }
      document.getElementById("uploadStatusMsg").classList.add("hidden");
      document.getElementById("addMediaModal").classList.remove("hidden");
    }

    function updateAdminUI() {
      const adminBtn = document.getElementById("adminToggleBtn");
      const icon = document.getElementById("adminToggleIcon");
      const addMediaBtn = document.getElementById("addMediaPromptBtn");
      const addMediaBtnIcon = document.getElementById("addMediaBtnIcon");
      const addMediaBtnText = document.getElementById("addMediaBtnText");
      const overviewAdminBadge = document.getElementById("overviewAdminBadge");

      if (isAdminMode) {
        if (adminBtn) adminBtn.className = "w-6 h-6 rounded-full bg-[#1e3a24] hover:bg-[#2d5234] text-[#a7f3d0] border border-[#064e3b] flex items-center justify-center transition shrink-0 opacity-90 shadow-sm";
        if (icon) icon.textContent = "🔓";
        if (addMediaBtn) {
          addMediaBtn.className = "px-1.5 py-0.5 text-[9px] bg-[#1e3a24] hover:bg-[#2d5234] text-[#a7f3d0] border border-[#064e3b] font-bold rounded-xs flex items-center gap-0.5 transition shadow-xs cursor-pointer";
        }
        if (addMediaBtnIcon) addMediaBtnIcon.textContent = "🔓";
        if (addMediaBtnText) addMediaBtnText.textContent = "사진 추가/관리";
        if (overviewAdminBadge) overviewAdminBadge.classList.remove("hidden");
      } else {
        if (adminBtn) adminBtn.className = "w-6 h-6 rounded-full bg-[#3b2513]/15 hover:bg-[#841c1c]/80 text-[#543b22] hover:text-[#fbf7ee] border border-[#543b22]/30 flex items-center justify-center transition shrink-0 opacity-40 hover:opacity-100";
        if (icon) icon.textContent = "🔒";
        if (addMediaBtn) {
          addMediaBtn.className = "px-1.5 py-0.5 text-[9px] bg-[#841c1c] hover:bg-[#6b1414] text-[#fbf7ee] font-bold rounded-xs flex items-center gap-0.5 transition shadow-xs cursor-pointer";
        }
        if (addMediaBtnIcon) addMediaBtnIcon.textContent = "✏️";
        if (addMediaBtnText) addMediaBtnText.textContent = "사진첩 편집";
        if (overviewAdminBadge) overviewAdminBadge.classList.add("hidden");
      }

      document.querySelectorAll(".delete-photo-btn").forEach(b => {
        if (isAdminMode) b.classList.remove("hidden");
        else b.classList.add("hidden");
      });
    }

    document.getElementById("adminToggleBtn").addEventListener("click", () => {
      if (isAdminMode) {
        isAdminMode = false;
        updateAdminUI();
        showToast("🔒 방문자 모드로 전환되었습니다.");
      } else {
        pendingAdminAction = null;
        document.getElementById("adminPasswordInput").value = "";
        document.getElementById("adminAuthError").classList.add("hidden");
        document.getElementById("adminAuthModal").classList.remove("hidden");
        document.getElementById("adminPasswordInput").focus();
      }
    });

    function verifyAdminPass() {
      if (document.getElementById("adminPasswordInput").value.trim() === ADMIN_PASSPHRASE) {
        isAdminMode = true;
        updateAdminUI();
        document.getElementById("adminAuthModal").classList.add("hidden");
        playMagicChime();
        showToast("🔓 특파원 편집 권한이 승인되었습니다!");
        if (pendingAdminAction === 'addMedia') {
          pendingAdminAction = null;
          openAddMediaModal();
        } else if (pendingAdminAction === 'editLetter') {
          pendingAdminAction = null;
          if (selectedSpot) {
            document.getElementById("letterInputText").value = selectedSpot.letter || "";
            document.getElementById("letterModal").classList.remove("hidden");
          }
        }
      } else {
        document.getElementById("adminAuthError").classList.remove("hidden");
      }
    }

    document.getElementById("submitAdminAuthBtn").addEventListener("click", verifyAdminPass);
    document.getElementById("adminPasswordInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") verifyAdminPass();
    });
    document.getElementById("closeAdminAuthModalBtn").addEventListener("click", () => document.getElementById("adminAuthModal").classList.add("hidden"));
    document.getElementById("cancelAdminAuthBtn").addEventListener("click", () => document.getElementById("adminAuthModal").classList.add("hidden"));

    const addMediaModal = document.getElementById("addMediaModal");
    document.getElementById("addMediaPromptBtn").addEventListener("click", () => {
      if (isAdminMode) {
        openAddMediaModal();
      } else {
        pendingAdminAction = 'addMedia';
        document.getElementById("adminPasswordInput").value = "";
        document.getElementById("adminAuthError").classList.add("hidden");
        document.getElementById("adminAuthModal").classList.remove("hidden");
        document.getElementById("adminPasswordInput").focus();
      }
    });
    document.getElementById("closeAddMediaModalBtn").addEventListener("click", () => addMediaModal.classList.add("hidden"));
    document.getElementById("cancelAddMediaBtn").addEventListener("click", () => addMediaModal.classList.add("hidden"));

    const dropZone = document.getElementById("dropZone");
    const bulkFileInput = document.getElementById("bulkFileInput");
    dropZone.addEventListener("click", () => bulkFileInput.click());

    bulkFileInput.addEventListener("change", async (e) => {
      if (!selectedSpot || !e.target.files.length) return;
      const status = document.getElementById("uploadStatusMsg");
      status.classList.remove("hidden");
      status.textContent = `사진 ${e.target.files.length}장을 저장 중...`;

      const categorySelect = document.getElementById("mediaCategorySelect");
      const category = (categorySelect && !categorySelect.parentElement.classList.contains("hidden")) ? categorySelect.value : undefined;

      let count = 0;
      for (const file of Array.from(e.target.files)) {
        if (!file.type.startsWith("image/")) continue;
        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = async (evt) => {
            const photoData = {
              destId: selectedSpot.id,
              type: "image",
              url: evt.target.result,
              caption: file.name.replace(/\.[^/.]+$/, "")
            };
            if (category) photoData.category = category;
            await savePhotoToDB(photoData);
            count++;
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      status.textContent = `${count}장의 사진이 보관소에 저장되었습니다!`;
      await renderDrawerPhotos(selectedSpot);
      const overviewModal = document.getElementById("photoOverviewModal");
      if (overviewModal && !overviewModal.classList.contains("hidden")) {
        openPhotoOverviewModal(selectedSpot, category || 'all');
      }
      setTimeout(() => {
        addMediaModal.classList.add("hidden");
        showToast(`${count}장의 사진이 성공적으로 등록되었습니다!`);
      }, 700);
    });

    // Tab switching in Media Modal
    const tabLocalFileBtn = document.getElementById("tabLocalFileBtn");
    const tabWebUrlBtn = document.getElementById("tabWebUrlBtn");
    const bulkUploadView = document.getElementById("bulkUploadView");
    const urlUploadView = document.getElementById("urlUploadView");

    tabLocalFileBtn.addEventListener("click", () => {
      tabLocalFileBtn.className = "flex-1 py-1.5 text-xs font-black text-[#841c1c] border-b-2 border-[#841c1c] bg-[#ede0c4]";
      tabWebUrlBtn.className = "flex-1 py-1.5 text-xs font-bold text-[#5c4026] hover:bg-[#ede0c4]/60 transition";
      bulkUploadView.classList.remove("hidden");
      urlUploadView.classList.add("hidden");
    });

    tabWebUrlBtn.addEventListener("click", () => {
      tabWebUrlBtn.className = "flex-1 py-1.5 text-xs font-black text-[#841c1c] border-b-2 border-[#841c1c] bg-[#ede0c4]";
      tabLocalFileBtn.className = "flex-1 py-1.5 text-xs font-bold text-[#5c4026] hover:bg-[#ede0c4]/60 transition";
      urlUploadView.classList.remove("hidden");
      bulkUploadView.classList.add("hidden");
    });

    document.getElementById("saveNewMediaBtn").addEventListener("click", async () => {
      if (!selectedSpot) return;
      const urlInput = document.getElementById("newMediaUrl");
      const captionInput = document.getElementById("newMediaCaption");
      const url = urlInput.value.trim();
      const caption = captionInput.value.trim() || "보도 아카이브";

      if (!url) {
        showToast("유효한 웹 주소를 입력하세요.");
        return;
      }

      const categorySelect = document.getElementById("mediaCategorySelect");
      const category = (categorySelect && !categorySelect.parentElement.classList.contains("hidden")) ? categorySelect.value : undefined;

      const photoData = {
        destId: selectedSpot.id,
        type: "image",
        url: url,
        caption: caption
      };
      if (category) photoData.category = category;

      await savePhotoToDB(photoData);

      urlInput.value = "";
      captionInput.value = "";
      addMediaModal.classList.add("hidden");
      await renderDrawerPhotos(selectedSpot);
      const overviewModal = document.getElementById("photoOverviewModal");
      if (overviewModal && !overviewModal.classList.contains("hidden")) {
        openPhotoOverviewModal(selectedSpot, category || 'all');
      }
      showToast("새로운 보도 사진 링크가 등록되었습니다!");
    });

    // Letter editing
    const letterModal = document.getElementById("letterModal");
    document.getElementById("editLetterBtn").addEventListener("click", () => {
      if (!selectedSpot) return;
      if (isAdminMode) {
        document.getElementById("letterInputText").value = selectedSpot.letter || "";
        letterModal.classList.remove("hidden");
      } else {
        pendingAdminAction = 'editLetter';
        document.getElementById("adminPasswordInput").value = "";
        document.getElementById("adminAuthError").classList.add("hidden");
        document.getElementById("adminAuthModal").classList.remove("hidden");
        document.getElementById("adminPasswordInput").focus();
      }
    });
    document.getElementById("closeLetterModalBtn").addEventListener("click", () => letterModal.classList.add("hidden"));
    document.getElementById("cancelLetterBtn").addEventListener("click", () => letterModal.classList.add("hidden"));
    document.getElementById("saveLetterBtn").addEventListener("click", () => {
      if (!selectedSpot) return;
      selectedSpot.letter = document.getElementById("letterInputText").value.trim();
      document.getElementById("drawerLetterContent").textContent = selectedSpot.letter || "“작성된 편지가 없습니다.”";
      letterModal.classList.add("hidden");
      showToast("현장 편지가 성공적으로 저장되었습니다!");
    });

    window.addEventListener("resize", () => {
      if (containerEl) {
        width = containerEl.clientWidth;
        height = containerEl.clientHeight;
        svg.attr("viewBox", `0 0 ${width} ${height}`);
        initProjection(currentProjectionType);
      }
    });

    async function loadData() {
      try {
        await initDB();
        updateAdminUI();

        // 1. World Geometries
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        const topoData = await res.json();
        worldGeoJsonData = topojson.feature(topoData, topoData.objects.countries);

        // 2. South Korea Provinces
        try {
          const krRes = await fetch("https://cdn.jsdelivr.net/gh/southkorea/southkorea-maps@master/kostat/2018/json/skorea-provinces-2018-topo-simple.json");
          if (krRes.ok) {
            const krTopo = await krRes.json();
            const objKey = Object.keys(krTopo.objects)[0];
            koreaGeoJsonData = topojson.feature(krTopo, krTopo.objects[objKey]);
          }
        } catch (e) {
          console.warn("Detailed Korea map fallback:", e);
        }

        buildCarousel();
        initCarouselDragScroll();
        initProjection("2d");
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      }
    }

    window.addEventListener("DOMContentLoaded", loadData);
