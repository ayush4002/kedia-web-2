/**
 * Kedia Builders & Colonizers — Advanced 3D Architectural Visualization & Motion
 * 
 * Features:
 * 1. Hero: Cinematic 2.5D/3D Architectural Scene (Kedia's Atulyam flagship project)
 * 2. 3D Project Cards: Multi-plane perspective tilt, glare sheen, and elevation
 * 3. Interactive 3D Property Explorer: 360° orbit, zoom, feature views, atmosphere lighting
 * 4. Schedule a Site Visit Modal Controller
 * 5. Reduced-motion & mobile adaptive performance
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Global architectural project catalog for 3D exploration
  const PROJECT_ASSETS = {
    'kedias-atulyam': {
      name: "Kedia's Atulyam",
      type: "VILLAS & PLOTS",
      location: "Sikar Road, Jaipur",
      rera: "RAJ/P/2021/1572",
      price: "Price on Request",
      views: {
        facade: {
          image: "/media/img/2025/04/IMG_7780-2-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2025_04_IMG_7780-2-scaled.webp",
          caption: "Grand Architectural Villa Elevation & Private Balconies"
        },
        gate: {
          image: "/media/img/2024/06/Gate-1-1920.webp",
          depth: "/assets/3d/media/depth/img_2024_06_Gate-1.webp",
          caption: "Grand Entrance Portal with Traditional Chhatri Crowning"
        },
        layout: {
          image: "/media/img/2025/04/DJI_0770-3-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2025_04_DJI_0770-3-scaled.webp",
          caption: "Township Master Plan & Paved Internal Corridors"
        },
        courtyard: {
          image: "/media/img/2025/04/IMG_7796-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2025_04_IMG_7796-scaled.webp",
          caption: "Landscaped Courtyard & Green Community Parks"
        }
      }
    },
    'kedias-umang': {
      name: "Kedia's Umang",
      type: "VILLAS",
      location: "Sirsi Road, Jaipur",
      rera: "RAJ/P/2020/1344",
      price: "Price on Request",
      views: {
        facade: {
          image: "/media/img/2023/09/UMANG-ENTRANCE-1-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2023_09_UMANG-ENTRANCE-1-scaled.webp",
          caption: "Colonial Villa Elevation with Sandstone Portico"
        },
        gate: {
          image: "/media/img/2023/09/UMANG-ENTRANCE-1-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2023_09_UMANG-ENTRANCE-1-scaled.webp",
          caption: "Gated Security Entrance & Boulevard"
        },
        layout: {
          image: "/media/img/2023/09/DJI_0949-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2023_09_DJI_0949-scaled.webp",
          caption: "Township Aerial Overview & Clubhouse"
        },
        courtyard: {
          image: "/media/img/2023/09/DJI_0947-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2023_09_DJI_0947-scaled.webp",
          caption: "Central Parklands & Landscaped Avenues"
        }
      }
    },
    'kedias-landmark': {
      name: "Kedia's Landmark",
      type: "RESIDENTIAL PLOTS",
      location: "Ajmer Road, Jaipur",
      rera: "RAJ/P/2022/1945",
      price: "Price on Request",
      views: {
        facade: {
          image: "/media/img/2025/04/LANDMARK-003-1920.webp",
          depth: "/assets/3d/media/depth/img_2024_05_DJI_0242-scaled.webp",
          caption: "Wide 40-Foot Metalled Avenues & Plotted Development"
        },
        gate: {
          image: "/media/img/2024/06/Gate-1-1920.webp",
          depth: "/assets/3d/media/depth/img_2024_06_Gate-1.webp",
          caption: "Entrance Gateway & Boundary Enclosure"
        },
        layout: {
          image: "/media/img/2024/05/DJI_0242-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2024_05_DJI_0242-scaled.webp",
          caption: "Zoned Sectors & Underground Utilities"
        },
        courtyard: {
          image: "/media/img/2024/05/DJI_0230-copy-scaled-1920.webp",
          depth: "/assets/3d/media/depth/img_2024_05_DJI_0230-copy-scaled.webp",
          caption: "Open Green Belts & Meditative Gardens"
        }
      }
    }
  };

  // Helper: WebGL Shader program compiler
  function createWebGLDepthRenderer(canvas, opts) {
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' });
    if (!gl) return null;

    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D uImage;
      uniform sampler2D uDepth;
      uniform vec2 uOffset;
      uniform float uIntensity;
      uniform float uZoom;
      uniform vec3 uLightingColor;
      uniform float uLightingWarmth;
      varying vec2 vUv;

      void main() {
        // Sample depth map (near = bright 1.0, far = dark 0.0)
        float depth = texture2D(uDepth, vUv).r;
        
        // Depth-driven displacement vector with clamped bounds
        vec2 shift = uOffset * uIntensity * (depth - 0.5);
        shift = clamp(shift, vec2(-0.045), vec2(0.045));

        // Center-relative zoom & UV mapping with edge overscan safety
        vec2 centered = (vUv - 0.5) / uZoom;
        vec2 uv = clamp(centered + 0.5 + shift, 0.002, 0.998);

        vec4 color = texture2D(uImage, uv);

        // Lighting atmosphere adjustment
        color.rgb = mix(color.rgb, color.rgb * uLightingColor, uLightingWarmth);

        // Subtle radial vignette
        float dist = distance(vUv, vec2(0.5, 0.5));
        float vignette = smoothstep(0.85, 0.32, dist);
        color.rgb *= mix(0.88, 1.0, vignette);

        gl_FragColor = color;
      }
    `;

    function compileShader(type, source) {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

    gl.useProgram(program);

    // Quad geometry
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uImageLoc = gl.getUniformLocation(program, 'uImage');
    const uDepthLoc = gl.getUniformLocation(program, 'uDepth');
    const uOffsetLoc = gl.getUniformLocation(program, 'uOffset');
    const uIntensityLoc = gl.getUniformLocation(program, 'uIntensity');
    const uZoomLoc = gl.getUniformLocation(program, 'uZoom');
    const uLightingColorLoc = gl.getUniformLocation(program, 'uLightingColor');
    const uLightingWarmthLoc = gl.getUniformLocation(program, 'uLightingWarmth');

    // Create 1x1 default textures
    function createTexture(r, g, b) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([r, g, b, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    }

    let imgTex = createTexture(22, 38, 74);
    let depthTex = createTexture(128, 128, 128);

    function loadTextureFromUrl(url, isDepth, callback) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (isDepth) {
          gl.deleteTexture(depthTex);
          depthTex = tex;
        } else {
          gl.deleteTexture(imgTex);
          imgTex = tex;
        }
        if (callback) callback();
      };
      img.src = url;
    }

    let currentZoom = 1.0;
    let targetZoom = 1.0;
    let offsetX = 0;
    let offsetY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let intensity = opts.intensity || 0.055;
    let lightingColor = [1.0, 1.0, 1.0];
    let lightingWarmth = 0.0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function render() {
      resize();

      // Smooth interpolation for inertia and camera physics
      offsetX += (targetOffsetX - offsetX) * 0.08;
      offsetY += (targetOffsetY - offsetY) * 0.08;
      currentZoom += (targetZoom - currentZoom) * 0.1;

      gl.useProgram(program);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imgTex);
      gl.uniform1i(uImageLoc, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, depthTex);
      gl.uniform1i(uDepthLoc, 1);

      gl.uniform2f(uOffsetLoc, offsetX, offsetY);
      gl.uniform1f(uIntensityLoc, intensity);
      gl.uniform1f(uZoomLoc, currentZoom);
      gl.uniform3f(uLightingColorLoc, lightingColor[0], lightingColor[1], lightingColor[2]);
      gl.uniform1f(uLightingWarmthLoc, lightingWarmth);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    return {
      render,
      setTargetOffset: (x, y) => { targetOffsetX = x; targetOffsetY = y; },
      setTargetZoom: (z) => { targetZoom = Math.max(0.9, Math.min(1.4, z)); },
      getZoom: () => targetZoom,
      reset: () => { targetOffsetX = 0; targetOffsetY = 0; targetZoom = 1.0; },
      loadPair: (imgUrl, depthUrl, onComplete) => {
        let loaded = 0;
        const check = () => { if (++loaded === 2 && onComplete) onComplete(); };
        loadTextureFromUrl(imgUrl, false, check);
        loadTextureFromUrl(depthUrl, true, check);
      },
      setLighting: (preset) => {
        if (preset === 'day') {
          lightingColor = [1.02, 1.0, 0.98];
          lightingWarmth = 0.15;
        } else if (preset === 'golden') {
          lightingColor = [1.25, 1.05, 0.75];
          lightingWarmth = 0.45;
        } else if (preset === 'twilight') {
          lightingColor = [0.72, 0.82, 1.15];
          lightingWarmth = 0.4;
        }
      },
      dispose: () => {
        gl.deleteTexture(imgTex);
        gl.deleteTexture(depthTex);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      }
    };
  }

  // ==========================================================================
  // 1. HERO SECTION CINEMATIC 3D ENGINE
  // ==========================================================================
  function initHero3D() {
    const heroCanvas = document.getElementById('hero-3d-canvas');
    const heroStage = document.querySelector('.hero-3d-stage');
    if (!heroCanvas || !heroStage || prefersReducedMotion) return;

    const renderer = createWebGLDepthRenderer(heroCanvas, { intensity: 0.05 });
    if (!renderer) return;

    // Load actual Kedia's Atulyam architectural depth pair
    const heroImg = '/media/img/2025/04/IMG_7780-2-scaled-1920.webp';
    const heroDepth = '/assets/3d/media/depth/img_2025_04_IMG_7780-2-scaled.webp';

    renderer.loadPair(heroImg, heroDepth, () => {
      heroCanvas.classList.add('is-ready');
    });

    let isOrbitMode = false;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let orbitX = 0;
    let orbitY = 0;

    // Orbit button toggle
    const orbitToggle = document.getElementById('hero-orbit-toggle');
    const orbitStatus = document.getElementById('hero-orbit-status');
    if (orbitToggle && orbitStatus) {
      orbitToggle.addEventListener('click', () => {
        isOrbitMode = !isOrbitMode;
        orbitToggle.classList.toggle('is-active', isOrbitMode);
        heroStage.classList.toggle('orbit-active', isOrbitMode);
        orbitStatus.textContent = isOrbitMode ? 'Interactive Orbit' : 'Glide';
      });
    }

    // Pointer move for subtle parallax
    window.addEventListener('mousemove', (e) => {
      if (isOrbitMode && isDragging) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX = nx;
      mouseY = ny;
    }, { passive: true });

    // Interactive orbit drag on hero stage
    heroCanvas.addEventListener('mousedown', (e) => {
      if (!isOrbitMode) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isOrbitMode || !isDragging) return;
      const dx = (e.clientX - dragStartX) * 0.003;
      const dy = (e.clientY - dragStartY) * 0.003;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      orbitX = Math.max(-1.2, Math.min(1.2, orbitX + dx));
      orbitY = Math.max(-0.8, Math.min(0.8, orbitY + dy));
    }, { passive: true });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Render loop with slow camera push-in and idle drift
    let animId = 0;
    let startTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(heroStage);

    function heroLoop(now) {
      if (!isVisible) {
        animId = requestAnimationFrame(heroLoop);
        return;
      }

      const elapsed = (now - startTime) * 0.001;

      // Slow cinematic Lissajous camera breathing
      const idleX = Math.sin(elapsed * 0.4) * 0.18;
      const idleY = Math.cos(elapsed * 0.3) * 0.12;

      // Combined target offset
      const finalX = isOrbitMode ? (orbitX + mouseX * 0.2) : (mouseX * 0.6 + idleX);
      const finalY = isOrbitMode ? (orbitY + mouseY * 0.2) : (mouseY * 0.4 + idleY);

      renderer.setTargetOffset(finalX, finalY);
      renderer.render();

      animId = requestAnimationFrame(heroLoop);
    }

    animId = requestAnimationFrame(heroLoop);
  }

  // ==========================================================================
  // 2. 3D PROJECT PORTFOLIO CARDS (PERSPECTIVE TILT & LAYERED DEPTH)
  // ==========================================================================
  function init3DProjectCards() {
    if (prefersReducedMotion || isTouchDevice) return;

    const cards = document.querySelectorAll('[data-tilt-card]');
    cards.forEach((card) => {
      let rect = null;

      const updateRect = () => {
        rect = card.getBoundingClientRect();
      };

      card.addEventListener('mouseenter', updateRect);

      card.addEventListener('mousemove', (e) => {
        if (!rect) updateRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalized: -1 to 1
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        // Restrained architectural tilt angles (max +/- 6.5 deg)
        const rotX = -normY * 6.5;
        const rotY = normX * 6.5;

        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;

        // Specular glare reflection
        card.style.setProperty('--mouse-x', `${Math.round((x / rect.width) * 100)}%`);
        card.style.setProperty('--mouse-y', `${Math.round((y / rect.height) * 100)}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
        rect = null;
      });
    });
  }

  // ==========================================================================
  // 3. INTERACTIVE 3D ARCHITECTURAL PROPERTY EXPLORER (MODAL & VIEWER)
  // ==========================================================================
  function initPropertyViewer() {
    const modal = document.getElementById('property-viewer-modal');
    const canvas = document.getElementById('pv-canvas');
    const fallbackImg = document.getElementById('pv-fallback-img');
    const closeBtn = document.getElementById('pv-close-btn');
    const resetBtn = document.getElementById('pv-reset-btn');
    const fsBtn = document.getElementById('pv-fs-btn');
    const zoomInBtn = document.getElementById('pv-zoom-in');
    const zoomOutBtn = document.getElementById('pv-zoom-out');
    const loader = document.getElementById('pv-loader');
    const progressBar = document.getElementById('pv-progress-fill');
    const projectSelect = document.getElementById('pv-project-select');
    const infoTitle = document.getElementById('pv-info-title');
    const infoType = document.getElementById('pv-info-type');
    const infoLoc = document.getElementById('pv-info-location');
    const infoRera = document.getElementById('pv-info-rera');
    const infoPrice = document.getElementById('pv-info-price');
    const detailLink = document.getElementById('pv-detail-link');
    const visitBtn = document.getElementById('pv-visit-btn');
    const viewTabs = document.querySelectorAll('[data-pv-view]');
    const lightPills = document.querySelectorAll('[data-pv-light]');
    const viewport = document.getElementById('pv-viewport');

    if (!modal || !canvas) return;

    let renderer = createWebGLDepthRenderer(canvas, { intensity: 0.06 });
    let currentSlug = 'kedias-atulyam';
    let currentViewKey = 'facade';
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let rotX = 0;
    let rotY = 0;
    let animId = 0;
    let isRunning = false;

    function syncProject(slug) {
      currentSlug = slug || 'kedias-atulyam';
      const proj = PROJECT_ASSETS[currentSlug] || PROJECT_ASSETS['kedias-atulyam'];

      if (infoTitle) infoTitle.textContent = proj.name;
      if (infoType) infoType.textContent = proj.type;
      if (infoLoc) infoLoc.textContent = proj.location;
      if (infoRera) infoRera.textContent = proj.rera;
      if (infoPrice) infoPrice.textContent = proj.price;
      if (detailLink) detailLink.href = `/projects/${currentSlug}`;
      if (projectSelect) projectSelect.value = currentSlug;

      loadCurrentView();
    }

    function loadCurrentView() {
      const proj = PROJECT_ASSETS[currentSlug] || PROJECT_ASSETS['kedias-atulyam'];
      const view = proj.views[currentViewKey] || proj.views.facade;

      if (fallbackImg) {
        fallbackImg.src = view.image;
        fallbackImg.alt = `${proj.name} — ${view.caption}`;
      }

      if (loader && progressBar) {
        loader.classList.add('is-active');
        progressBar.style.width = '30%';
      }

      if (renderer) {
        renderer.loadPair(view.image, view.depth, () => {
          if (progressBar) progressBar.style.width = '100%';
          setTimeout(() => {
            if (loader) loader.classList.remove('is-active');
          }, 250);
        });
      }
    }

    function loop() {
      if (!isRunning) return;
      if (renderer) {
        renderer.setTargetOffset(rotX, rotY);
        renderer.render();
      }
      animId = requestAnimationFrame(loop);
    }

    function openViewer(slug) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      isRunning = true;
      rotX = 0;
      rotY = 0;
      syncProject(slug);
      loop();
    }

    function closeViewer() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      isRunning = false;
      cancelAnimationFrame(animId);
    }

    // Event listeners
    if (closeBtn) closeBtn.addEventListener('click', closeViewer);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeViewer();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeViewer();
    });

    if (resetBtn && renderer) {
      resetBtn.addEventListener('click', () => {
        rotX = 0;
        rotY = 0;
        renderer.reset();
      });
    }

    if (zoomInBtn && renderer) {
      zoomInBtn.addEventListener('click', () => {
        renderer.setTargetZoom(renderer.getZoom() + 0.12);
      });
    }

    if (zoomOutBtn && renderer) {
      zoomOutBtn.addEventListener('click', () => {
        renderer.setTargetZoom(renderer.getZoom() - 0.12);
      });
    }

    // Viewport mouse dragging for 3D rotation
    viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - dragStartX) * 0.0035;
      const dy = (e.clientY - dragStartY) * 0.0035;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      rotX = Math.max(-1.5, Math.min(1.5, rotX + dx));
      rotY = Math.max(-1.1, Math.min(1.1, rotY + dy));
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support for dragging
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - dragStartX) * 0.004;
      const dy = (e.touches[0].clientY - dragStartY) * 0.004;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      rotX = Math.max(-1.5, Math.min(1.5, rotX + dx));
      rotY = Math.max(-1.1, Math.min(1.1, rotY + dy));
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Scroll wheel zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (!renderer) return;
      const delta = e.deltaY * -0.001;
      renderer.setTargetZoom(renderer.getZoom() + delta);
    }, { passive: false });

    // Double click to reset
    viewport.addEventListener('dblclick', () => {
      rotX = 0;
      rotY = 0;
      if (renderer) renderer.reset();
    });

    // Project select change
    if (projectSelect) {
      projectSelect.addEventListener('change', (e) => {
        syncProject(e.target.value);
      });
    }

    // View tab switching
    viewTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        viewTabs.forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        currentViewKey = tab.dataset.pvView || 'facade';
        loadCurrentView();
      });
    });

    // Lighting atmosphere switching
    lightPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        lightPills.forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const lightMode = pill.dataset.pvLight || 'day';
        if (renderer) renderer.setLighting(lightMode);
      });
    });

    // Fullscreen toggle
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        const container = document.querySelector('.pv-container');
        if (!document.fullscreenElement) {
          container.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Hook schedule site visit from within viewer
    if (visitBtn) {
      visitBtn.addEventListener('click', () => {
        closeViewer();
        const proj = PROJECT_ASSETS[currentSlug];
        openSiteVisitModal(proj ? proj.name : '');
      });
    }

    // Global trigger delegate
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-pv]');
      if (!trigger) return;
      e.preventDefault();
      const slug = trigger.dataset.openPv || 'kedias-atulyam';
      openViewer(slug);
    });
  }

  // ==========================================================================
  // 4. SCHEDULE A SITE VISIT MODAL CONTROLLER
  // ==========================================================================
  function openSiteVisitModal(projectName) {
    const modal = document.getElementById('site-visit-modal');
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (projectName) {
      const select = document.getElementById('svm-project');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase().includes(projectName.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function initSiteVisitModal() {
    const modal = document.getElementById('site-visit-modal');
    const closeBtn = document.getElementById('svm-close');
    if (!modal) return;

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-site-visit]');
      if (!trigger) return;
      e.preventDefault();
      const proj = trigger.getAttribute('data-open-site-visit') || '';
      openSiteVisitModal(proj);
    });
  }

  // Initialize all components on DOM ready
  function init() {
    initHero3D();
    init3DProjectCards();
    initPropertyViewer();
    initSiteVisitModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
