// /* eslint-disable @next/next/no-img-element */
import TestimonialsData from "../../../data/Book/Testimonials.json";


const Testimonials = () => {
  return (
    <>
    <h4 className=" text-center bg-gray  mb-4 pt-50">
              See What Other People Are Saying...
            </h4>
      <section className="stauts-testim bg-gray">
        <div className="container pb-100 pt-50">
        
          <div className="row">
          
            <div className="img-stauts">
              <img src="agency-3/img/12915.jpg" alt="" />
              <div className="stauts">
                {TestimonialsData.numbers.map((number, index) => (
                  <div className="item" key={index}>
                    <h4>
                      {number.number}
                      <span>{number.operator}</span> +
                    </h4>
                    <h6>{number.title}</h6>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-12  testimonial-box">
              {TestimonialsData.testimonials.map((testimonial) => (
                <div className="testimonials-gr slick-dotted col-lg-4 col-sm-12 mb-100 mr-4" key={testimonial.id}>
                  <div className="item" key={testimonial.id}>
                    <p>{testimonial.text}</p>
                    <div className="info">
                      <div className="img">
                        <div className="img-box">
                          <img src={testimonial.img} alt="" />
                        </div>
                      </div>
                      <div className="cont">
                        <div className="author">
                          <h6 className="author-name">{testimonial.person}</h6>
                          <h4 className="author-title">{testimonial.title}</h4>
                          
                          {/* <span className="author-details">
                            {testimonial.text}
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
