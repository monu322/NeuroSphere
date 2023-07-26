/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
// import TeamData from "../../../data/About/Team.json";

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
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Team = ({ teamData }) => {
  const TeamData = teamData;
  const sliderRef = useRef(null);

  const next = () => sliderRef.current.slickNext();
  const previous = () => sliderRef.current.slickPrev();

  return (
    <section className="team-crs section-padding team-section-dark-bg">
      <div className="container pt-2">
        <div className="row mt-4">
          <div className="col-lg-3 valign mt-60 sm-mt0 lg-pl80">
            <div className="full-width">
              <div className="sec-head custom-font mb-0">
                <h6>Employees</h6>
                <h3>Our Team.</h3>
              </div>
              <div
                className="navs mt-30 wow fadeInUp mb-4"
                data-wow-delay=".3s"
              >
                <span className="prev cursor-pointer" onClick={previous}>
                  <i className="fas fa-chevron-left"></i>
                </span>
                <span className="next cursor-pointer" onClick={next}>
                  <i className="fas fa-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <Slider
              {...teamSliderSettings}
              ref={sliderRef}
              className="team-container"
            >
              {TeamData.map((teamMember, index) => (
                <div
                  className="item wow fadeInUp square-container"
                  data-wow-delay=".3s"
                  key={index}
                >
                  <div className="img wow imago team-img-holder square-container">
                    <img
                      className="team-img img-fluid"
                      src={teamMember.img}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h5>{teamMember.name}</h5>
                    <span>{teamMember.postition}</span>
                    <div className="social">
                      {teamMember.linkedin ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.linkedin}
                          target="_blank"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {teamMember.fb ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.fb}
                          target="_blank"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {teamMember.twitter ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.twitter}
                          target="_blank"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {teamMember.insta ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.insta}
                          target="_blank"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {teamMember.github ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.github}
                          target="_blank"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {teamMember.dribble ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.dribble}
                          target="_blank"
                        >
                          <i className="fab fa-dribbble"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {teamMember.link ? (
                        <a
                          rel="noreferrer"
                          href={teamMember.link}
                          target="_blank"
                        >
                          Click Here
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="row justify-content-center">

        </div>
      </div>
    </section>
  );
};

export default Team;
