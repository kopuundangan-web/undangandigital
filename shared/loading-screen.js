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
      pointer-events: none;
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

  const pendingAssets = new Set();
  const trackedAssets = new WeakMap();
  const countedResourceUrls = new Set();
  const progressStatus = loader.querySelector(".kopu-loading-screen__status");
  const progressBar = loader.querySelector(".kopu-loading-screen__progress");
  let completedAssets = 0;
  let visualProgress = 0;
  let downloadedBytes = 0;
  let initialScanComplete = false;
  let documentReady = document.readyState !== "loading";
  let resolveAssets;
  const assetsReady = new Promise((resolve) => {
    resolveAssets = resolve;
  });

  const formatMegabytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const countCompletedResource = (source) => {
    if (!source || countedResourceUrls.has(source)) {
      return;
    }
    countedResourceUrls.add(source);
    const entry = performance.getEntriesByName(source, "resource").at(-1);
    if (entry) {
      downloadedBytes += entry.transferSize || entry.encodedBodySize || 0;
    }
  };

  const updateProgress = (contentReady = false) => {
    const pendingCount = pendingAssets.size;
    const trackedAssetCount = completedAssets + pendingCount;
    const assetRatio =
      trackedAssetCount > 0
        ? Math.min(1, completedAssets / trackedAssetCount)
        : 0;
    // Track observed asset completion without starting duplicate network requests.
    const targetProgress = contentReady ? 100 : Math.min(90, assetRatio * 90);
    visualProgress = Math.max(visualProgress, targetProgress);
    progressBar.style.setProperty("--kopu-loading-progress", String(visualProgress / 100));
    progressBar.setAttribute("aria-valuenow", String(Math.round(visualProgress)));

    const status = `Memuat ko pu kisah · ${formatMegabytes(downloadedBytes)}`;
    if (progressStatus.textContent !== status) {
      progressStatus.textContent = status;
    }
  };

  const finishWhenReady = () => {
    const appRoot = document.getElementById("root");
    const contentReady =
      initialScanComplete &&
      pendingAssets.size === 0 &&
      (appRoot
        ? document.body.dataset.kopuWaitForMain === "false" || appRoot.querySelector("main")
        : documentReady);
    updateProgress(contentReady);
    if (contentReady) {
      resolveAssets();
    }
  };

  const settleAsset = (asset, failed) => {
    if (!pendingAssets.delete(asset)) {
      return;
    }
    countCompletedResource(trackedAssets.get(asset) || asset.currentSrc || asset.src);
    completedAssets += 1;
    if (failed) {
      console.error("Gagal memuat aset undangan:", asset.currentSrc || asset.src);
    }
    updateProgress();
    finishWhenReady();
  };

  const trackImage = (image) => {
    const source = image.currentSrc || image.src || image.srcset;
    const previousSource = trackedAssets.get(image);
    if (!source || previousSource === source) {
      return;
    }
    const bounds = image.getBoundingClientRect();
    const isInInitialViewport = bounds.bottom > 0 && bounds.top < window.innerHeight;
    if (!isInInitialViewport) {
      return;
    }
    if (previousSource) {
      pendingAssets.delete(image);
    }
    trackedAssets.set(image, source);
    if (image.complete) {
      if (image.naturalWidth === 0) {
        console.error("Gagal memuat gambar undangan:", source);
      }
      countCompletedResource(source);
      completedAssets += 1;
      updateProgress();
      return;
    }
    pendingAssets.add(image);
    image.addEventListener(
      "load",
      () => {
        if (trackedAssets.get(image) === source) {
          settleAsset(image, false);
        }
      },
      { once: true },
    );
    image.addEventListener(
      "error",
      () => {
        if (trackedAssets.get(image) === source) {
          settleAsset(image, true);
        }
      },
      { once: true },
    );
    updateProgress();
  };

  const trackMedia = (media) => {
    const source = media.currentSrc || media.src || media.querySelector("source[src]")?.src;
    const previousSource = trackedAssets.get(media);
    if (!source || previousSource === source) {
      return;
    }
    trackedAssets.set(media, source);
    if (media.error) {
      console.error("Gagal memuat media undangan:", source);
      return;
    }

    // Media keeps loading through the browser; it must not hold the invitation behind the loader.
    const recordMediaBytes = () => {
      countCompletedResource(source);
      updateProgress();
    };
    if (media.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      recordMediaBytes();
    } else {
      media.addEventListener("loadeddata", recordMediaBytes, { once: true });
    }
    media.addEventListener(
      "error",
      () => console.error("Gagal memuat media undangan:", source),
      { once: true },
    );
  };

  const scanElement = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE || loader.contains(node)) {
      return;
    }
    if (node.matches("img")) {
      trackImage(node);
    } else if (node.matches("audio, video")) {
      trackMedia(node);
    } else if (node.matches("source")) {
      const media = node.closest("audio, video");
      if (media) {
        trackMedia(media);
      }
    }
  };

  const scan = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    scanElement(node);
    node.querySelectorAll("*").forEach(scanElement);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (loader.contains(mutation.target)) {
        return;
      }
      if (mutation.type === "attributes") {
        scanElement(mutation.target);
      } else {
        mutation.addedNodes.forEach(scan);
      }
    });
    finishWhenReady();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcset", "loading", "poster"],
  });
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      documentReady = true;
      finishWhenReady();
    },
    { once: true },
  );
  scan(document.body);
  initialScanComplete = true;
  finishWhenReady();

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
  const introReady = loadScript(gsapUrl)
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
      window.gsap.registerPlugin(window.SplitText);

      const words = loader.querySelectorAll(".kopu-loading-screen__word span");
      return new Promise((resolve) => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
          loader.classList.remove("kopu-loading-screen--fallback");
          window.gsap.set(words, { yPercent: 0, autoAlpha: 1 });
          resolve();
          return;
        }

        // SplitText lets GSAP stagger each character while preserving the phrase order.
        splitWords = [...words].map((word) =>
          window.SplitText.create(word, { type: "chars", charsClass: "kopu-loading-screen__char" }),
        );
        const characters = splitWords.map((split) => split.chars);
        window.gsap.set(characters.flat(), { yPercent: 115, autoAlpha: 0 });
        loader.classList.remove("kopu-loading-screen--fallback");
        let firstCycleComplete = false;
        introAnimation = window.gsap.timeline({
          repeat: -1,
          onRepeat: () => {
            if (!firstCycleComplete) {
              firstCycleComplete = true;
              resolve();
            }
          },
        });
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
      });
    })
    .catch((error) => {
      console.error("Animasi GSAP loading screen tidak tersedia:", error);
      return new Promise((resolve) => window.setTimeout(resolve, 1200));
    });

  const fontReady = loadFont().catch((error) => {
    console.error("Font Great Vibes loading screen tidak tersedia:", error);
  });

  Promise.all([assetsReady, fontReady, introReady]).then(() => {
    observer.disconnect();
    if (introAnimation) {
      introAnimation.kill();
    }
    // Restore the original text before removing the loader.
    splitWords.forEach((split) => split.revert());

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    loader.classList.add("kopu-loading-screen--leaving");
    window.setTimeout(() => {
      loader.remove();
      style.remove();
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    }, reducedMotion ? 0 : 700);
  });
})();
