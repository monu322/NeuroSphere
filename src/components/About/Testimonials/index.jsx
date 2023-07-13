/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Slider from "react-slick";
import dynamic from "next/dynamic";
const Split = dynamic(() => import("../../Split"), { ssr: false });
import NoSSR from "../../NoSSR";
import ModalVideo from "react-modal-video";

const testimonialsSliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const Testimonials = ({ testimonialsData }) => {
  const TestimonialsData = testimonialsData;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let elem = document.querySelector(".background.bg-img[data-background]");
    if (elem)
      elem.style.backgroundImage = `url(${elem.getAttribute(
        "data-background"
      )})`;
  }, []);

  return (
    <>
      <section className="block-sec mt-4 pt-4">
        <div
          className="background bg-img section-padding pb-0 "
          data-background="/assets/img/1.jpg"
          data-overlay-dark="6"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="vid-area">
                  <div className="vid-icon">
                    {/* <div className="vid" onClick={() => setIsOpen(true)}>
                      <div className="vid-butn">
                        <span className="icon">
                          <i className="fas fa-play"></i>
                        </span>
                      </div>
                    </div> */}
                  </div>

                  <div className="cont">
                    <Split className="wow">
                      <h3 data-splitting>{TestimonialsData.videoText}</h3>
                    </Split>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="testim-box">
                  <div className="head-box">
                    <h6 className="wow fadeIn" data-wow-delay=".5s">
                      Our Happy Clients
                    </h6>
                    <h4 className="wow fadeInLeft" data-wow-delay=".5s">
                      What Client&apos;s Say?
                    </h4>
                  </div>
                  <Slider
                    {...testimonialsSliderSettings}
                    className="slic-item wow fadeInUp slick-dotted"
                    data-wow-delay=".5s"
                  >
                    {TestimonialsData.testimonials.map((testimonial) => (
                      <div className="item" key={testimonial.id}>
                        <p>{testimonial.content}</p>
                        <div className="info">
                          <div className="img">
                            <div className="img-box">
                              <img src={testimonial.img} alt="" />
                            </div>
                          </div>
                          <div className="cont">
                            <div className="author">
                              <h6 className="author-name custom-font">
                                {testimonial.name}
                              </h6>
                              <span className="author-details">
                                {testimonial.details}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NoSSR>
        <ModalVideo
          channel={TestimonialsData.video.channel}
          autoplay
          isOpen={isOpen}
          videoId={TestimonialsData.video.id}
          onClose={() => setIsOpen(false)}
        />
      </NoSSR>
    </>
  );
};

export default Testimonials;
