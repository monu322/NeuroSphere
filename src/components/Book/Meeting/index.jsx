import React from "react";
import styles from "./MeetingSection.module.css";
import { InlineWidget } from "react-calendly";

const MeetingSection = () => {
  const meetingLink = process.env.CALENDLY_LINK || ''
  return (
    <section id="meeting-section" className="ui-intro ">
      <div className="container">
        <div
          className="row mt-4 mb-4 pt-4"
          style={{ backgroundColor: "white" }}
        >
          <div className="col-lg-6 md-mb50">
            <InlineWidget
              styles={{ minWidth: "320px", height: "1000px" }}
              url={meetingLink}
            />
          </div>
          <div className="col-lg-6 md-mb50">
            <div className={styles.container}>
              <div className={styles.header}>
                <img src="/assets/img/clients/1.jpg" alt="Profile" />
                <h6>Schedule Your Meeting</h6>
                <h4>Free 30-Minute Discovery Call</h4>
              </div>
              <div className={styles.infoBox}>
                <img src="agency-3/meeting/user.png" alt="Question" />
                <div>
                  <h3>Our Story</h3>
                  <p>
                    Our founder worked as a Software Developer for 15 years. After
                    his experience he setup a team to serve small and large bsuinesses with world class web and mobile app development services. 
                  </p>
                </div>
              </div>
              <div className={styles.infoBox}>
                <img src="agency-3/meeting/targeting.png" alt="Vision" />
                <div>
                  <h3>Our Vision</h3>
                  <p>
                    To be a trusted partner is digital transformation of small and large businesses. 
                  </p>
                </div>
              </div>
              <div className={styles.infoBox}>
                <img src="agency-3/meeting/purpose.png" alt="Question" />
                <div>
                  <h3>Our Purpose</h3>
                  <p>
                    To develop modern sleek highly effective software solutions at affordable cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingSection;

