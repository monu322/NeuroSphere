/* eslint-disable @next/next/no-img-element */
import { useEffect, Fragment } from "react";
import Link from 'next/link';
import WorksData from '../../data/Works2.json';
import initIsotope from "../../common/initIsotope";

const Works = () => {
  useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);

  return (
    <section className="portfolio section-padding pb-70">
      <div className="container">
          {/* gallery */}
          <div className="gallery full-width">
            {
              WorksData.map((work, index) => (
                <div className={`col-md-6 items ${work.type} ${(index === 0 || index === 2) && 'lg-mr'}`} key={index}>
                  <div className="item-img wow fadeInUp" data-wow-delay=".4s">
                    <Link href='/project-details'>
                      <a><img src={work.img} alt="image" /></a>
                    </Link>
                  </div>
                  <div className="cont">
                    <h6>{ work.title }</h6>
                    <span>
                      {
                        work.tags.map((tag, idx) => (
                          <Fragment key={idx}>
                            <Link href="#0">
                              <a>{ tag }</a>
                            </Link>
                            { idx !== work.tags.length - 1 && <>, </> }
                          </Fragment>
                        ))
                      }
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
      </div>
  </section>
  )
}

export default Works