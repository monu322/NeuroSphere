/* eslint-disable @next/next/no-img-element */
import { useEffect, Fragment } from "react";
import Link from "next/link";
import WorksData from "../../../data/Home3/Works.json";
import initIsotope from "../../../common/initIsotope";

const Works = () => {
  useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);

  return (
    <section className="ui-works section-padding home-portfolio-section mt-0">
      <div className="container mt-0">
        <div className="row mt-0 pt-4">
          <div className="col-lg-7">
            <div className="main-header mt-4 pt-4">
              <h6>Our Portfolio</h6>
              <h3>Check out our work.</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {/* filter links */}
          <div className="filtering text-center col-12">
            <div className="filter">
              {WorksData.filters.map((filter, index) => (
                <span
                  data-filter={filter.operator}
                  className={filter.operator === "*" ? "active" : ""}
                  key={index}
                >
                  {filter.title}
                </span>
              ))}
            </div>
          </div>
          {/* gallery */}
          <div className="gallery full-width">
            {WorksData.works.map((work, index) => (
              <div
                className={`col-lg-4 col-md-6 items wow fadeInUp ${work.type}`}
                data-wow-delay=".4s"
                key={index}
              >
                <div className="item-img imago wow">
                  <Link href={`/works/${index + 1}`}>
                    <a href={`/works/${index + 1}`} className="popimg">
                      <img
                        src={work.img}
                        alt="image"
                        className="img-fluid custom-img"
                      />
                      <div className="item-img-overlay"></div>
                    </a>
                  </Link>
                </div>
                <div className="cont">
                  <h6>{work.title}</h6>
                  <span>
                    {work.tags.map((tag, idx) => (
                      <Fragment key={idx}>
                        <Link href="#0">
                          <a>{tag}</a>
                        </Link>
                        {idx !== work.tags.length - 1 && <>, </>}
                      </Fragment>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
