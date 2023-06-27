/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import TestimonialsData from '../../../data/Home1/Testimonials.json';
import Slider from "react-slick";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

const Testimonials = () => {
  const sliderRef = useRef(null);

  const next = () => sliderRef.current.slickNext();

  const previous = () => sliderRef.current.slickPrev();

  return (
    <section className="testimonials section-padding bg-dark position-re">
      <div className="container mt-4">
        <div className="row p-2">
          <div className="col-lg-3">
            <div className="quote-icon mt-4">
              <img src="assets/img/clients/quote.svg" alt="" />
            </div>
          </div>
          <div className="col-lg-7 valign">
            <div className="tistem full-width">
              <Slider {...sliderSettings} ref={sliderRef}>
                {
                  TestimonialsData.map((item, index) => (
                    <div className="item" key={index}>
                      <div className="text-bg">{ item.textBg }</div>
                      <p>{ item.text }</p>
                      <h6 className="gr-text">{ item.person }</h6>
                    </div>
                  ))
                }
              </Slider>
            </div>
          </div>
          <div className="col-lg-2 valign">
            <div className="controls full-width">
              <div className="float-right">
                <span className="pe-7s-angle-left prev cursor-pointer" onClick={previous}></span>
                <span className="pe-7s-angle-right next cursor-pointer" onClick={next}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadows">
        <img className="shadow sh-left" src="agency-1/img/shadow.png" alt="" />
        <img className="shadow sh-right" src="agency-1/img/shadow.png" alt="" />
      </div>
    </section>
  )
}

export default Testimonials