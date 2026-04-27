(function () {
  const TARGET_ORIGIN = "https://www.granilpiso.com.br";
  const REDIRECT_DELAY_SECONDS = 10;
  const REDIRECT_DELAY_MS = REDIRECT_DELAY_SECONDS * 1000;
  const ROOT_ALIASES = new Set(["/index.html", "/404.html"]);

  function buildRedirectUrl(rawUrl) {
    const currentUrl = new URL(rawUrl);

    if (currentUrl.protocol === "file:") {
      return `${TARGET_ORIGIN}/`;
    }

    const targetUrl = new URL(TARGET_ORIGIN);
    let pathname = currentUrl.pathname || "/";

    if (ROOT_ALIASES.has(pathname)) {
      pathname = "/";
    }

    targetUrl.pathname = pathname;
    targetUrl.search = currentUrl.search;
    targetUrl.hash = currentUrl.hash;

    return targetUrl.toString();
  }

  const redirectUrl = buildRedirectUrl(window.location.href);
  const redirectLink = document.getElementById("redirect-link");
  const redirectCode = document.getElementById("redirect-code");
  const canonicalLink = document.getElementById("canonical-link");
  const refreshMeta = document.getElementById("refresh-meta");
  const countdown = document.getElementById("countdown");
  const progressBar = document.getElementById("progress-bar");

  if (redirectLink) {
    redirectLink.href = redirectUrl;
  }

  if (redirectCode) {
    redirectCode.textContent = redirectUrl;
  }

  if (canonicalLink) {
    canonicalLink.href = redirectUrl;
  }

  if (refreshMeta) {
    refreshMeta.setAttribute("content", `${REDIRECT_DELAY_SECONDS};url=${redirectUrl}`);
  }

  document.documentElement.style.setProperty("--delay-seconds", String(REDIRECT_DELAY_SECONDS));

  if (progressBar) {
    progressBar.style.animationDuration = `${REDIRECT_DELAY_SECONDS}s`;
  }

  const startedAt = Date.now();

  function updateCountdown() {
    if (!countdown) {
      return;
    }

    const elapsed = Date.now() - startedAt;
    const remainingMs = Math.max(0, REDIRECT_DELAY_MS - elapsed);
    const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

    countdown.textContent = String(remainingSeconds);
  }

  updateCountdown();

  const countdownTimer = window.setInterval(function () {
    updateCountdown();

    if (Date.now() - startedAt >= REDIRECT_DELAY_MS) {
      window.clearInterval(countdownTimer);
    }
  }, 250);

  window.setTimeout(function () {
    window.location.replace(redirectUrl);
  }, REDIRECT_DELAY_MS);
})();