import { useEffect, useRef } from 'react';

const Header = () => {
  const bgElement = useRef(null);

  useEffect(() => {
    if (bgElement.current) bgElement.current.style.backgroundImage = `url(${bgElement.current.dataset.background})`;
  }, []);

  return (
    <section className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-9">
            <div className="cont">
              <h4><span className="stroke">Let&apos;s</span> Talk About Your project.</h4>
              <p>Feel free to ask us any questions about how to get started.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="img-wrapper bg-img parallaxie" data-background="/assets/img/about.jpg" data-overlay-dark="3" ref={bgElement}>
        <div className="title">
          <div className="container">
            <h3>Contact Us</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header