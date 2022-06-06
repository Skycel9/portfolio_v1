const videos = Array.from(document.querySelectorAll("video"));
const playBtn = Array.from(document.querySelectorAll(".playBtn"));

playBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let btn = e.path.filter((el) => el.tagName === "A")[0];
    let relativeVideo = videos.filter(
      (el) => el.getAttribute("name") === btn.name
    )[0];

    if (relativeVideo.paused || relativeVideo.ended) {
      relativeVideo.play();
      btn.classList.add("hidden");
    } else {
      relativeVideo.pause();
      btn.classList.remove("hidden");
    }
  });
});

// Videos Events
videos.forEach((video) => {
  video.addEventListener("playing", () => {
    video.classList.add("playing");

    const btn = video.nextElementSibling;
    btn.classList.add("hidden");
  });
  video.addEventListener("pause", () => {
    const btn = video.nextElementSibling;
    btn.classList.remove("hidden");
  });
  video.addEventListener("ended", () => {
    video.classList.remove("playing");

    const btn = video.nextElementSibling;
    btn.classList.remove("hidden");
  });
});
