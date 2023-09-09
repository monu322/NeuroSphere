/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import TeamData from '../../../data/Home2/Team.json';

const Team = () => {
  return (
    <section className="team-ui section-padding bg-gray">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="main-header">
              <h6>Our Team</h6>
              <h3 className="gr-text">Meet the people.</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            TeamData.map((teamMember, index) => (
              <div className={`col-lg-4 item ${teamMember.shapeClass} ${index !== teamMember.length -1 && 'md-mb50'}`} key={teamMember.id}>
                <div className="img">
                  <img src={teamMember.img} alt="" />
                </div>
                <div className="info valign">
                  <div className="full-width">
                    <h6>{ teamMember.name }</h6>
                    <p>{ teamMember.desc }</p>
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
      </div>
    </section>
  )
}

export default Team