// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const revealTargets = document.querySelectorAll(".stat, .card, .service, .about-text, .bar-row, h2, .email");
revealTargets.forEach(el => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// Count-up numbers
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || "";
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(target * eased).toLocaleString("en-US");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target);
      numObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-num").forEach(el => numObserver.observe(el));

// Bar chart fill
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + "%";
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".bar-fill").forEach(el => barObserver.observe(el));

// Welcome video: show a placeholder only if the video file is missing
(function () {
  const frame = document.querySelector(".video-frame");
  const video = frame && frame.querySelector("video");
  const source = video && video.querySelector("source");
  if (!frame || !video || !source) return;

  const showPlaceholder = () => frame.classList.add("no-video");
  const hidePlaceholder = () => frame.classList.remove("no-video");
  const checkOrientation = () => {
    if (video.videoWidth && video.videoHeight) {
      // Vertical video: use a narrower frame so it is not cropped or stretched
      frame.classList.toggle("portrait", video.videoHeight > video.videoWidth);
    }
  };

  source.addEventListener("error", showPlaceholder);
  video.addEventListener("error", showPlaceholder);
  video.addEventListener("loadedmetadata", () => { hidePlaceholder(); checkOrientation(); });
  video.addEventListener("loadeddata", () => { hidePlaceholder(); checkOrientation(); });
  video.addEventListener("play", () => { hidePlaceholder(); checkOrientation(); });

  // Some phones never load metadata until play is pressed, so rely on the
  // browser's own state: only treat the file as missing if it has no source.
  window.addEventListener("load", () => {
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE && video.readyState === 0) {
      showPlaceholder();
    }
    checkOrientation();
  });
})();

// Pending cards should not navigate anywhere
document.querySelectorAll(".card.pending").forEach(card => {
  card.addEventListener("click", ev => ev.preventDefault());
});
