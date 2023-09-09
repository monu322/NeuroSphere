import { useEffect } from "react";
import Script from "next/script";
import loadingPace from "../../common/loadingPace";
import appData from "../../data/app.json";

const LoadingScreen = () => {
  useEffect(() => {
    let bodyEl = document.querySelector("body");

    if (appData.showLoading) {
      loadingPace();
      if (bodyEl.classList.contains("hideX")) bodyEl.classList.remove("hideX");
    } else {
      bodyEl.classList.add("hideX");
    }
  });

  return (
    <>
      <div className={`${appData.showLoading === true ? "showX" : "hideX"}`}>
        <div id="preloader">
        </div>
      </div>

      {
        appData.showLoading &&
          <Script
            id="pace"
            strategy="beforeInteractive"
            src="/assets/js/pace.min.js"
          />
      }
    </>
  );
};

export default LoadingScreen;
