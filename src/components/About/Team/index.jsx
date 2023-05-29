/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import Link from 'next/link';
import Slider from "react-slick";
import TeamData from '../../../data/About/Team.json';

const teamSliderSettings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 762,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

const Team = () => {
  const sliderRef = useRef(null);

  const next = () => sliderRef.current.slickNext();
  const previous = () => sliderRef.current.slickPrev();

  return (
    <section className="team-crs section-padding team-section-dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 valign">
            <div className="full-width">
              <div className="sec-head custom-font mb-0">
                <h6>Employees</h6>
                <h3>Our Team.</h3>
              </div>
              <div className="navs mt-30 wow fadeInUp" data-wow-delay=".3s">
                <span className="prev cursor-pointer" onClick={previous}>
                  <i className="fas fa-chevron-left"></i>
                </span>
                <span className="next cursor-pointer" onClick={next}>
                  <i className="fas fa-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <Slider {...teamSliderSettings} ref={sliderRef} className="team-container">
              {
                TeamData.map((teamMember, index) => (
                  <div className="item wow fadeInUp" data-wow-delay=".3s" key={index}>
                    <div className="img wow imago team-img-holder">
                      <img className="team-img" src={teamMember.img} alt="" />
                    </div>
                    <div className="info">
                      <h5>{ teamMember.name }</h5>
                      <span>{ teamMember.postition }</span>
                      <div className="social">
                        {
                          teamMember.fb?<a href={teamMember.fb} target="_blank"><i className="fab fa-facebook-f"></i></a>:''
                        }
                        {
                          teamMember.twitter?<Link href="#0">
                            <a><i className="fab fa-twitter"></i></a>
                          </Link>:''
                        }
                        {
                          teamMember.instagram?<Link href="#0">
                            <a><i className="fab fa-instagram"></i></a>
                          </Link>:''
                        }
                        {

                        }
                        
                        <Link href="#0">
                          <a><i className="fab fa-linkedin"></i></a>
                        </Link>
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

export default Team