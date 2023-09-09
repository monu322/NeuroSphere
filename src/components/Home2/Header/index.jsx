import { useState, useEffect, useRef } from "react";
import NoSSR from '../../NoSSR';
import HeaderData from "../../../data/Home2/Header.json";
import ModalVideo from 'react-modal-video'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerElem = useRef(null);

  useEffect(() => {
    if (headerElem.current) headerElem.current.style.backgroundImage = `url(${headerElem.current.dataset.background})`;
  }, []);

  return (
    <>
      <header className="ui-slider in-box bg-img valign" data-background={HeaderData.background} data-overlay-dark="6" ref={headerElem}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="caption text-center">
                <h1 className="fw-700 ls1">{ HeaderData.title }</h1>
                <p>{ HeaderData.text }</p>
                <div className="vid valign" onClick={() => setIsOpen(true)}>
                  <div className="vid-butn">
                    <span className="icon">
                      <i className="fas fa-play"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <NoSSR>
        <ModalVideo
          channel={HeaderData.video.channel}
          autoplay
          isOpen={isOpen}
          videoId={HeaderData.video.channel}
          onClose={() => setIsOpen(false)}
        />
      </NoSSR>
    </>
  );
};

export default Header;
