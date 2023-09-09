const loadingPace = () => {
    let preloader = document.querySelector("#preloader");

    Pace.on("start", () => preloader.classList.remove("isdone"));

    Pace.on("done", () => preloader.classList.add("isdone"));

    if (document.querySelector("body").classList.contains("pace-done")) preloader.classList.add("isdone");

    document.addEventListener("load", () => preloader.classList.add("isdone"));
}

export default loadingPace