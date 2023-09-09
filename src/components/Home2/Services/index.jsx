import { useState, useEffect } from "react";
import Link from "next/link";
import ServicesData from "../../../data/Home2/Services.json";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Services = () => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    });
  }, []);

  return (
    <div className="services section-padding">
      <div className="container-fluid">
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
                  762: {
                    slidesPerView: 2
                  },
                  992: {
                    slidesPerView: 3
                  },
                  1024: {
                    slidesPerView: 4
                  }
                }}
              >
                {
                  ServicesData.map((service) => (
                    <SwiperSlide key={service.id} className="swiper-slide">
                      <div className="item">
                        <span className={`icon gr-text ${service.iconClass}`}></span>
                        <h6>{ service.title }</h6>
                        <p>{ service.desc }</p>
                        <Link href="#0">
                          <a>Read More</a>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Services