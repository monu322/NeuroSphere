/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import WorksData from "../../../data/Home2/Works.json";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Works = () => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    });
  }, []);

  return (
    <section className="works-crs section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="main-header">
              <h6>Our Portfolio</h6>
              <h3 className="gr-text">Unlimited experience.</h3>
            </div>
          </div>
        </div>
        <div className="swiper-container">
          {
            !load && (
              <Swiper
                loop={true}
                navigation={false}
                pagination={false}
                className="swiper-wrapper"
                slidesPerView={1}
                breakpoints={{
                  992: {
                    slidesPerView: 2
                  },
                  1024: {
                    slidesPerView: 3
                  }
                }}
              >
                {
                  WorksData.map((work) => (
                    <SwiperSlide key={work.id} className="swiper-slide">
                      <div className="item">
                        <a href={work.img} className="popimg">
                          <div className="img">
                            <img src={work.img} alt="" />
                          </div>
                        </a>
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
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Works