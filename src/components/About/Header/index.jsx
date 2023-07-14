import { useEffect, Fragment } from "react";

const Header = ({ headerData }) => {
  const HeaderData = headerData;
  useEffect(() => {
    let elem = document.querySelector(".img-wrapper.bg-img[data-background]");
    if (elem) {
      elem.style.backgroundImage = `url(${elem.getAttribute(
        "data-background"
      )})`;
      elem.style.backgroundRepeat = `no-repeat`;
      elem.style.backgroundSize = `cover`;
      elem.style.backgroundAttachment = `fixed`;
      elem.style.backgroundPosition = `center 387.2px`;
      window.onscroll = () => {
        let scroll = window.pageYOffset;
        if (scroll > 0) {
          elem.style.backgroundPosition = `center ${387.2 - scroll * 0.75}px`;
        }
      };
    }
  }, []);

  return (
    <section className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h4>
                {HeaderData.headerText.map((text, index) => {
                  return index % 2 === 0 ? (
                    <Fragment key={index}>{text}</Fragment>
                  ) : (
                    <span key={index} className="stroke">
                      {text}
                    </span>
                  );
                })}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div
        className="img-wrapper bg-img parallaxie"
        data-background="/assets/img/about.jpg"
        data-overlay-dark="3"
      >
        <div className="title">
          <div className="container">
            <h3>About Us</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
