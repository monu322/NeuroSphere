import { useEffect, useRef } from "react";

const Header = () => {
  const bgElement = useRef(null);

  useEffect(() => {
    if (bgElement.current)
      bgElement.current.style.backgroundImage = `url(${bgElement.current.dataset.background})`;
  }, []);

  return (
    <section className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h4>
                <span className="stroke">Empower</span> Your Career Journey.
              </h4>
              <p>
                Collaborate with the best and brightest minds in the industry,
                where teamwork and synergy drive remarkable achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="img-wrapper bg-img parallaxie"
        data-background="/assets/img/about.jpg"
        data-overlay-dark="3"
        ref={bgElement}
      >
        <div className="title">
          <div className="container">
            <h3>Join Us</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
