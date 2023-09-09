/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import TeamData from "../../../data/Home1/Team.json";

const Team = () => {
  return (
    <section className="team position-re">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="main-header text-center ">
              <h6>Our Team</h6>
              <h3>Meet the people.</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            TeamData.map((teamMember, index) => (
              index <= 3 &&
              <div className={`col-lg-3 col-md-6 item m-0 p-0${teamMember.hoverClass}`} key={index}>
                <div className="img m-0 p-0">
                  <img src={teamMember.img} alt="team member" />
                </div>
                <div className="info valign">
                  <div className="full-width">
                    <h6>{ teamMember.name }</h6>
                    <p>{ teamMember.description }</p>
                    <div className="social">
                      <Link href="#0">
                        <a><i className="fab fa-facebook-f"></i></a>
                      </Link>
                      <Link href="#0">
                        <a><i className="fab fa-twitter"></i></a>
                      </Link>
                      <Link href="#0">
                        <a><i className="fab fa-instagram"></i></a>
                      </Link>
                      <Link href="#0">
                        <a><i className="fab fa-youtube"></i></a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="shape"></div>
              </div>
            ))
          }
        </div>
        <div className="row">
          {
            TeamData.map((teamMember, index) => (
              index > 3 && index <= 5 &&
              <div className={`col-lg-3 col-md-6 item ${teamMember.hoverClass}`} key={index}>
                <div className="img">
                  <img src={teamMember.img} alt="team member" />
                </div>
                <div className="info valign">
                  <div className="full-width">
                    <h6>{ teamMember.name }</h6>
                    <p>{ teamMember.description }</p>
                    <div className="social">
                      <Link href="#0">
                        <a><i className="fab fa-facebook-f"></i></a>
                      </Link>
                      <Link href="#0">
                        <a><i className="fab fa-twitter"></i></a>
                      </Link>
                      <Link href="#0">
                        <a><i className="fab fa-instagram"></i></a>
                      </Link>
                      <Link href="#0">
                        <a><i className="fab fa-youtube"></i></a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="shape"></div>
              </div>
            ))
          }
          <div className="col-lg-4 offset-lg-2 item valign">
            <div className="full-width">
              <div className="join">
                <div className="icon">
                  <img src="agency-1/img/team/forward-arrow.png" alt="" />
                </div>
                <div className="link-go">
                  <Link href="#0">
                    <a>Wanna join the team?</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team