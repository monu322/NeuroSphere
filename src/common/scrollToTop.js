const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector(".progress-wrap");
  let progressPath = document.querySelector(".progress-wrap path");
  let pathLength = progressPath.getTotalLength();

  const updateProgress = () => {
    let scroll = window.pageYOffset;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  
  if (progressWrap) {
    progressPath.style.transition = progressPath.style.WebkitTransition = "none";
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > offset) {
        progressWrap.classList.add("active-progress");
      } else {
        document.querySelector(".progress-wrap").classList.remove("active-progress");
      }
    });

    progressWrap.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    });
  }
};

export default scrollToTop;
