/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Split = dynamic(() => import("../../Split"), { ssr: false });

const Minimal = ({ minimalData }) => {
  const MinimalData = minimalData;
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      new simpleParallax(imageRef.current, {
        orientation: "down",
        scale: 1.1,
      });
    }
  }, []);

  return (
    <section className="min-area bg-gray">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="img">
              <img
                className="thumparallax-down"
                src="/assets/img/min-area.jpg"
                alt=""
                ref={imageRef}
              />
              <small className="img-subtext">
                *An AI generated Syntetic Art, MidJorney
              </small>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content">
              <Split className="wow custom-font">
                <h4 data-splitting>About us.</h4>
              </Split>
              <Split className="wow txt">
                <p data-splitting>{MinimalData.aboutUs}</p>
              </Split>
              <ul className="feat">
                {MinimalData.minimals.map((item, index) => (
                  <li
                    className="wow fadeInUp"
                    data-wow-delay={`${0.2 * (index + 1)}s`}
                    key={item.id}
                  >
                    <h6>
                      <span>{item.id}</span> {item.title}
                    </h6>
                    <p>{item.details}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Minimal;
