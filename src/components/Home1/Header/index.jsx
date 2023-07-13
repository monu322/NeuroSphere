import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import HeaderData from "../../../data/Home1/Header.json";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Parallax } from "swiper";
import removeSlashFromPagination from "../../../common/removeSlashFromPagination";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Navigation, Pagination, Parallax]);

const Header = ({ headerData }) => {
  console.log();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    });
    setTimeout(() => {
      removeSlashFromPagination();
    }, 1000);
  }, []);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <header className="ui-slider ui-main">
      <div className="swiper-container parallax-slider">
        {!load && (
          <Swiper
            speed={1000}
            parallax={true}
            loop={true}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={{
              type: "fraction",
              clickable: true,
              el: paginationRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.params.pagination.el = paginationRef.current;
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.slides) {
                  for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].childNodes[0].setAttribute(
                      "data-swiper-parallax",
                      0.75 * swiper.width
                    );
                  }

                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;

                  swiper.params.pagination.el = paginationRef.current;
                }
              });
            }}
            className="swiper-wrapper"
            slidesPerView={1}
          >
            {HeaderData.map((slide) => (
              <SwiperSlide key={slide.id} className="swiper-slide">
                <div
                  className="bg-img valign"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  data-overlay-dark="6"
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="caption center p-2">
                          <h1 data-splitting className="md-mb30">
                            {slide.title.first}
                            {slide.title.second && (
                              <>
                                <br />
                                {slide.title.second}
                              </>
                            )}
                          </h1>
                          <p className="para">{slide.content}</p>
                          <Link href="/about">
                            <a className="btn-curve btn-lit mt-30 m-4 ">
                              <span>Learn More</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="setone setwo ssm-mb115">
          <div
            className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer"
            ref={navigationNextRef}
          >
            <i className="fas fa-chevron-right"></i>
          </div>
          <div
            className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer"
            ref={navigationPrevRef}
          >
            <i className="fas fa-chevron-left"></i>
          </div>
        </div>

        {/* <div className="social-icon">
          <a href="#0"><i className="fab fa-facebook-f"></i></a>
          <a href="#0"><i className="fab fa-twitter"></i></a>
          <a href="#0"><i className="fab fa-behance"></i></a>
          <a href="#0"><i className="fab fa-pinterest-p"></i></a>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
