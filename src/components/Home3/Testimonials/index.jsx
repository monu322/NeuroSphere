/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import TestimonialsData from "../../../data/Home3/Testimonials.json";

const testimonialsSliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

const Testimonials = () => {
  return (
    <section className="stauts-testim bg-gray">
      <div className="container">
        <div className="row">
          <div className="img-stauts">
            <img src="agency-3/img/f2.jpg" alt="" />
            <div className="stauts">
              {
                TestimonialsData.numbers.map((number, index) => (
                  <div className="item" key={index}>
                    <h4>{ number.number }<span>{ number.operator }</span> +</h4>
                    <h6>{ number.title }</h6>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-lg-6 offset-lg-6">
            <Slider {...testimonialsSliderSettings} className="testimonials-gr slick-dotted">
              {
                TestimonialsData.testimonials.map((testimonial) => (
                  <div className="item" key={testimonial.id}>
                    <p>{ testimonial.content }</p>
                    <div className="info">
                      <div className="img">
                        <div className="img-box">
                          <img src={testimonial.img} alt="" />
                        </div>
                      </div>
                      <div className="cont">
                        <div className="author">
                          <h6 className="author-name">{ testimonial.name }</h6>
                          <span className="author-details">{ testimonial.details }</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials