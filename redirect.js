(function () {
  const TARGET_ORIGIN = "https://www.granilpiso.com.br";
  const ROOT_ALIASES = new Set(["/index.html", "/404.html"]);

  function buildRedirectUrl(rawUrl) {
    const currentUrl = new URL(rawUrl);
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

  if (redirectLink) {
    redirectLink.href = redirectUrl;
  }

  if (redirectCode) {
    redirectCode.textContent = redirectUrl;
  }

  if (canonicalLink) {
    canonicalLink.href = redirectUrl;
  }

  window.location.replace(redirectUrl);
})();