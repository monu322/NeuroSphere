import { useEffect } from 'react';
import WorksHeaderData from '../../data/WorksHeader.json';

const Header = ({ headerRef }) => {
  useEffect(() => {
    window.onscroll = () => {
      let scrolled = window.pageYOffset;

      if (headerRef.current) {
        let caption = headerRef.current.querySelector('.caption');
        let parlx = headerRef.current.querySelector('.parlx');
    
        if (caption) {
          caption.style.transform = 'translate3d(0, ' + -(scrolled * 0.20) + 'px, 0)';
          caption.style.opacity = 1 - scrolled / 600;
        }
    
        if (parlx) {
          parlx.style.transform = 'translate3d(0, ' + -(scrolled * 0.20) + 'px, 0)';
          parlx.style.opacity = 1 - scrolled / 600;
        }
      }
    }
  }, [headerRef]);

  return (
    <header className="works-header fixed-slider hfixd valign" ref={headerRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-md-11 static">
            <div className="capt mt-50">
              <div className="parlx">
                <h2 className="custom-font">{ WorksHeaderData.headerTitle }</h2>
                <p>{ WorksHeaderData.headerDesc }</p>
              </div>
              <div className="bactxt custom-font valign">
                <span className="full-width">{ WorksHeaderData.bgText }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header