(() => {
  if (document.getElementById("kopu-loading-screen")) {
    return;
  }

  const fontFamily = "Great Vibes";
  const gsapUrl = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js";
  const splitTextUrl = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js";
  const styles = `
    .kopu-loading-screen {
      --kopu-loader-background: #f7f3e8;
      --kopu-loader-ink: #362c2d;
      --kopu-loader-accent: #7d3e42;
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      pointer-events: auto;
      display: grid;
      place-items: center;
      padding: 24px;
      background: var(--kopu-loader-background);
      color: var(--kopu-loader-ink);
      opacity: 1;
      visibility: visible;
      transition: opacity 0.65s ease, visibility 0s linear 0.65s;
    }

    .kopu-loading-screen__stack {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .kopu-loading-screen__progress {
      width: min(190px, 58vw);
      height: 2px;
      border-radius: 2px;
      background: color-mix(in srgb, var(--kopu-loader-accent) 18%, transparent);
    }

    .kopu-loading-screen__status {
      margin: 4px 0 0;
      color: var(--kopu-loader-ink);
      font-family: "DM Sans", sans-serif;
      font-size: 0.9rem;
      opacity: 0.72;
      text-align: center;
    }

    .kopu-loading-screen__brand {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transform: translate(-50%, -50%);
    }

    .kopu-loading-screen__download {
      position: absolute;
      top: 70%;
      left: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: min(280px, 80vw);
      transform: translate(-50%, -50%);
    }

    .kopu-loading-screen__progress::after {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: var(--kopu-loader-accent);
      transform: scaleX(var(--kopu-loading-progress, 0));
      transform-origin: left center;
      content: "";
      transition: transform 0.35s ease;
    }

    .kopu-loading-screen__word {
      margin: 0;
      line-height: 1.15;
      font-family: "Great Vibes", cursive;
    }

    .kopu-loading-screen__word span {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      will-change: transform, opacity;
    }

    .kopu-loading-screen__char {
      display: inline-block;
      will-change: transform, opacity;
    }

    .kopu-loading-screen--fallback .kopu-loading-screen__word span {
      animation: kopu-loader-rise 4.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }

    .kopu-loading-screen__word--brand {
      color: var(--kopu-loader-ink);
    }

    .kopu-loading-screen__word--brand,
    .kopu-loading-screen__word--name {
      font-size: clamp(2.8rem, 10vw, 3.5rem);
    }

    .kopu-loading-screen--fallback .kopu-loading-screen__word--brand span {
      animation-delay: 0.1s;
    }

    .kopu-loading-screen--fallback .kopu-loading-screen__word--name span {
      animation-delay: 1.2s;
    }

    .kopu-loading-screen--leaving {
      opacity: 0;
      visibility: hidden;
    }

    @keyframes kopu-loader-rise {
      0% {
        opacity: 0;
        transform: translateY(115%);
      }

      28%,
      75% {
        opacity: 1;
        transform: translateY(0);
      }

      90%,
      100% {
        opacity: 0;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .kopu-loading-screen--fallback .kopu-loading-screen__word span {
        animation: none;
        opacity: 1;
        visibility: visible;
        transform: none;
      }

      .kopu-loading-screen {
        transition-duration: 0.01ms;
      }

      .kopu-loading-screen__progress::after {
        width: 100%;
        transition-duration: 0.01ms;
      }
    }
  `;

  const style = document.createElement("style");
  style.textContent = styles;
  document.head.append(style);

  const loader = document.createElement("div");
  loader.id = "kopu-loading-screen";
  loader.className = "kopu-loading-screen kopu-loading-screen--fallback";
  loader.setAttribute("role", "status");
  loader.setAttribute("aria-live", "polite");
  loader.innerHTML = `
    <div class="kopu-loading-screen__stack">
      <div class="kopu-loading-screen__brand" aria-label="Ko pu Undangan">
        <p class="kopu-loading-screen__word kopu-loading-screen__word--brand"><span>Ko pu</span></p>
        <p class="kopu-loading-screen__word kopu-loading-screen__word--name"><span>Undangan</span></p>
      </div>
      <div class="kopu-loading-screen__download">
        <div class="kopu-loading-screen__progress" role="progressbar" aria-label="Progres memuat kisah undangan" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
        <p class="kopu-loading-screen__status" aria-live="polite">Memuat ko pu kisah · 0.0 MB</p>
      </div>
    </div>
  `;

  document.body.prepend(loader);

  const themeStyles = getComputedStyle(document.documentElement);
  const themeValue = (...names) => {
    for (const name of names) {
      const value = themeStyles.getPropertyValue(name).trim();
      if (value) {
        return value;
      }
    }
    return "";
  };
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const metaColor = themeMeta ? themeMeta.content : "";
  loader.style.setProperty(
    "--kopu-loader-background",
    themeValue("--color-bg", "--color-background", "--color-cream", "--cream") || metaColor || "#f7f3e8",
  );
  loader.style.setProperty(
    "--kopu-loader-ink",
    themeValue("--color-text", "--color-foreground", "--color-brown") || getComputedStyle(document.body).color,
  );
  loader.style.setProperty(
    "--kopu-loader-accent",
    themeValue("--color-primary", "--color-accent", "--color-brown", "--color-gold") ||
      getComputedStyle(document.body).color,
  );

  const progressStatus = loader.querySelector(".kopu-loading-screen__status");
  const progressBar = loader.querySelector(".kopu-loading-screen__progress");
  let criticalAssets = [];
  const pendingAssets = new Set();
  const completedAssetUrls = new Set();
  let visualProgress = 0;
  let downloadedBytes = 0;
  let finishAssets;
  const assetsReady = new Promise((resolve) => {
    finishAssets = resolve;
  });

  const formatMegabytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const updateProgress = () => {
    const completedCount = completedAssetUrls.size;
    const targetProgress = criticalAssets.length > 0 ? (completedCount / criticalAssets.length) * 100 : 100;
    visualProgress = Math.max(visualProgress, targetProgress);
    progressBar.style.setProperty("--kopu-loading-progress", String(visualProgress / 100));
    progressBar.setAttribute("aria-valuenow", String(Math.round(visualProgress)));

    const status = `Memuat ko pu kisah · ${formatMegabytes(downloadedBytes)}`;
    if (progressStatus.textContent !== status) {
      progressStatus.textContent = status;
    }
  };

  const settleAsset = (asset, failed) => {
    if (!pendingAssets.delete(asset.url)) {
      return;
    }
    completedAssetUrls.add(asset.url);
    const resource = performance.getEntriesByName(asset.url, "resource").at(-1);
    if (resource) {
      downloadedBytes += resource.transferSize || resource.encodedBodySize || 0;
    }
    if (failed) {
      console.error("Gagal memuat aset kritis undangan:", asset.url);
    }
    updateProgress();
    if (pendingAssets.size === 0) {
      finishAssets();
    }
  };

  const preloadCriticalAsset = (asset) =>
    new Promise((resolve) => {
      const url = new URL(asset.src, document.baseURI).href;
      const element = asset.type === "image" ? new Image() : document.createElement(asset.type);
      const readinessEvent = asset.type === "image" ? "load" : asset.type === "audio" ? "loadedmetadata" : "loadeddata";
      let settled = false;
      const finish = (failed) => {
        if (settled) {
          return;
        }
        settled = true;
        element.removeEventListener(readinessEvent, onReady);
        element.removeEventListener("error", onError);
        settleAsset({ url }, failed);
        resolve();
      };
      const onReady = () => finish(false);
      const onError = () => finish(true);

      pendingAssets.add(url);
      element.addEventListener(readinessEvent, onReady, { once: true });
      element.addEventListener("error", onError, { once: true });
      if (asset.type !== "image") {
        element.preload = "auto";
      } else {
        element.decoding = "async";
      }
      element.src = url;
      if (asset.type === "image" && element.complete) {
        finish(element.naturalWidth === 0);
      } else if (asset.type === "video" && element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        finish(false);
      } else if (asset.type === "audio" && element.readyState >= HTMLMediaElement.HAVE_METADATA) {
        finish(false);
      }
      updateProgress();
    });

  const startCriticalPreload = async () => {
    try {
      const manifestUrl = new URL("./loading-assets.json", document.baseURI);
      const response = await fetch(manifestUrl);
      if (!response.ok) {
        throw new Error(`Gagal memuat manifest aset kritis: ${response.status} ${response.statusText}`);
      }
      const manifest = await response.json();
      if (!Array.isArray(manifest)) {
        throw new TypeError("Manifest aset kritis harus berupa array");
      }
      criticalAssets = manifest;
    } catch (error) {
      console.error("Manifest aset kritis loading screen tidak tersedia:", error);
      finishAssets();
      return;
    }

    if (criticalAssets.length === 0) {
      updateProgress();
      finishAssets();
      return;
    }
    Promise.all(criticalAssets.map(preloadCriticalAsset)).then(() => {
      updateProgress();
      finishAssets();
    }).catch((error) => {
      console.error("Gagal menyiapkan aset kritis undangan:", error);
      finishAssets();
    });
  };

  startCriticalPreload();

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => {
        script.remove();
        reject(new Error(`Waktu tunggu habis saat memuat ${src}`));
      }, 4000);
      script.src = src;
      script.onload = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error(`Gagal memuat ${src}`));
      };
      document.head.append(script);
    });

  const loadFont = async () => {
    let fontLink = [...document.querySelectorAll('link[rel="stylesheet"]')].find((link) =>
      link.href.includes("Great+Vibes"),
    );
    if (!fontLink) {
      if (!document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = "https://fonts.googleapis.com";
        document.head.append(preconnect);
      }

      if (!document.querySelector('link[rel="preconnect"][href="https://fonts.gstatic.com"]')) {
        const fontPreconnect = document.createElement("link");
        fontPreconnect.rel = "preconnect";
        fontPreconnect.href = "https://fonts.gstatic.com";
        fontPreconnect.crossOrigin = "anonymous";
        document.head.append(fontPreconnect);
      }

      fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap";
      document.head.append(fontLink);
    }

    const stylesheetReady = new Promise((resolve, reject) => {
      if (fontLink.sheet) {
        resolve();
        return;
      }
      fontLink.addEventListener("load", resolve, { once: true });
      fontLink.addEventListener("error", () => reject(new Error("Gagal memuat stylesheet Great Vibes")), {
        once: true,
      });
    });
    let timeoutId;
    const timeout = new Promise((_, reject) => {
      timeoutId = window.setTimeout(() => reject(new Error("Waktu tunggu habis saat memuat font Great Vibes")), 4000);
    });
    try {
      await Promise.race([stylesheetReady.then(() => document.fonts.load(`56px "${fontFamily}"`)), timeout]);
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  let introAnimation;
  let splitWords = [];
  loadScript(gsapUrl)
    .then(() => {
      if (!window.gsap) {
        throw new Error("GSAP tidak tersedia setelah script selesai dimuat");
      }
      return loadScript(splitTextUrl);
    })
    .then(() => {
      if (!window.gsap || !window.SplitText) {
        throw new Error("Plugin GSAP SplitText tidak tersedia setelah script selesai dimuat");
      }
      if (!loader.isConnected) {
        return;
      }
      window.gsap.registerPlugin(window.SplitText);

      const words = loader.querySelectorAll(".kopu-loading-screen__word span");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        loader.classList.remove("kopu-loading-screen--fallback");
        window.gsap.set(words, { yPercent: 0, autoAlpha: 1 });
        return;
      }

      // SplitText lets GSAP stagger each character while preserving the phrase order.
      splitWords = [...words].map((word) =>
        window.SplitText.create(word, { type: "chars", charsClass: "kopu-loading-screen__char" }),
      );
      const characters = splitWords.map((split) => split.chars);
      window.gsap.set(characters.flat(), { yPercent: 115, autoAlpha: 0 });
      loader.classList.remove("kopu-loading-screen--fallback");
      introAnimation = window.gsap.timeline({ repeat: -1 });
      introAnimation
        .to(characters[0], {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
        })
        .to(characters[1], {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
        })
        .to({}, { duration: 1.1 })
        .to(characters.flat(), {
          yPercent: 0,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        // Reset below the baseline only after fading out, so characters never exit upward.
        .set(characters.flat(), { yPercent: 115 });
    })
    .catch((error) => {
      console.error("Animasi GSAP loading screen tidak tersedia:", error);
    });

  loadFont().catch((error) => {
    console.error("Font Great Vibes loading screen tidak tersedia:", error);
  });

  assetsReady.then(() => {
    const removeLoader = () => {
      if (introAnimation) {
        introAnimation.kill();
      }
      splitWords.forEach((split) => split.revert());
      loader.remove();
      style.remove();
    };
    const onLoaderTransitionEnd = (event) => {
      if (event.target === loader && event.propertyName === "opacity") {
        loader.removeEventListener("transitionend", onLoaderTransitionEnd);
        removeLoader();
      }
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      removeLoader();
      return;
    }

    loader.addEventListener("transitionend", onLoaderTransitionEnd);
    loader.classList.add("kopu-loading-screen--leaving");
  });
})();
