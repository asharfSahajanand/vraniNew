const script = document.createElement("script");
script.async = true;
script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1615420563101212";
script.crossOrigin = "anonymous";

document.head.appendChild(script);

(function () {

  let adsInitialized = false;
  let adRefreshCount = 0;
  const maxRefreshes = 3;
  const refreshInterval = 1800000; // 30 min
  let refreshTimer;

  const adSlots = [
    { divId: "ad-slot-1", slot: "4306431074", width: 300, height: 250 },
    { divId: "ad-slot-2", slot: "9890531561", width: 320, height: 300 },
    { divId: "ad-slot-3", slot: "7835213866", width: 250, height: 250 }
  ];

  function setupAds() {
    if (adsInitialized) return;

    try {
      loadAds();
      adsInitialized = true;
      console.log("AdSense initialized");

      setupControlledRefresh();

    } catch (e) {
      console.error("Adsense error:", e);
    }
  }

  function loadAds() {
    adSlots.forEach(({ divId, slot, width, height }) => {
      const container = document.getElementById(divId);
      if (!container) {
        console.log(divId + " not found");
        return;
      }

      container.innerHTML = `
        <ins class="adsbygoogle"
          style="display:inline-block;width:${width}px;height:${height}px"
          data-ad-client="ca-pub-1615420563101212"
          data-ad-slot="${slot}">
        </ins>
      `;

      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
        container.style.display = "block";
        container.style.minHeight = height + "px";
      } catch (err) {
        console.log("Ad load failed:", divId);
        container.style.display = "none";
      }
    });
  }

  function setupControlledRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);

    if (adRefreshCount >= maxRefreshes) return;

    refreshTimer = setInterval(() => {
      if (adRefreshCount >= maxRefreshes) {
        clearInterval(refreshTimer);
        return;
      }

      console.log("Refreshing ads...");

      // ⚠️ AdSense me real refresh allowed nahi hota
      // hack: reload ads
      adSlots.forEach(({ divId }) => {
        const el = document.getElementById(divId);
        if (el) el.innerHTML = "";
      });

      setTimeout(loadAds, 500);

      adRefreshCount++;

    }, refreshInterval);
  }

  function initializeAds() {
    const check = () => {
      if (document.readyState !== "loading") {
        setupAds();
      } else {
        setTimeout(check, 500);
      }
    };
    check();
  }

  initializeAds();

  window.addEventListener("beforeunload", () => {
    if (refreshTimer) clearInterval(refreshTimer);
  });

})();
