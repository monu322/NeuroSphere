/* eslint-disable @next/next/no-img-element */
import { useEffect, Fragment } from "react";
import Link from 'next/link';
import WorksData from '../../../data/Works3.json';
import initIsotope from "../../../common/initIsotope";

const Works = () => {
  useEffect(() => {
    setTimeout(() => {
      if (window.Isotope) initIsotope();
    }, 1000);
  }, []);

  let WorkLarge = ({ work }) => (
    <div className={`col-md-6 items ${work.type}`}>
      <div className="item-img wow fadeInUp" data-wow-delay=".4s">
        <Link href='/project-details'>
          <a><img src={work.img} alt="image" /></a>
        </Link>
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
    </div>
  )

  let WorkSmall = ({ work }) => (
    <div className={`col-md-6 items ${work.type}`}>
      <div className="row">
        <div className="col-lg-10">
          <div className="item-img wow fadeInUp" data-wow-delay=".4s">
            <Link href='/project-details'>
              <a><img src={work.img} alt="image" /></a>
            </Link>
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
        </div>
      </div>
    </div>
  )

  return (
    <section className="portfolio section-padding pb-70">
      <div className="container">
          {/* gallery */}
          <div className="gallery full-width">
            {
              WorksData.works.map((work, index) => 
                index < 4 ?
                (
                  index % 2 === 0 ?
                  <WorkLarge work={work} key={work.id} />
                  :
                  <WorkSmall work={work} key={work.id} />
                )
                :
                (
                  index % 2 === 0 ?
                  <WorkSmall work={work} key={work.id} />
                  :
                  <WorkLarge work={work} key={work.id} />
                )
              )
            }
          </div>
      </div>
    </section>
  )
}

export default Works