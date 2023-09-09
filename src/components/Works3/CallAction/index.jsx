import { useEffect, useRef, Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Split = dynamic(() => import("../../Split"), { ssr: false });
import WorksData from '../../../data/Works3.json';

const CallAction = () => {
  const bgElem = useRef(null);
  
  useEffect(() => {
    if (bgElem.current) bgElem.current.style.backgroundImage = "url(" + bgElem.current.dataset.background + ")";
  });

  return (
    <div className="call-action section-padding bg-img" data-background="/assets/img/pattern.png" ref={bgElem}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <div className="content sm-mb30">
              <Split className="wow">
                <h6 data-splitting>{ WorksData.worksTextTitle }</h6>
              </Split>
              <Split className="wow custom-font">
                <h2 data-splitting>
                  {
                    WorksData.worksText.map((text, index) => {
                      return (
                        index % 2 === 0 ?
                        <Fragment key={index}>
                          { text }
                        </Fragment>
                        :
                        <b>{ text }</b>
                      );
                    })
                  }
                  .
                </h2>
              </Split>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 valign">
            <Link href="/contact">
              <a className="btn-curve btn-lit"><span>Get In Touch</span></a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallAction