import React from "react";
import styles from "./MeetingSection.module.css";
import { InlineWidget } from "react-calendly";

const MeetingSection = () => {
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
              url="https://calendly.com/abhishek-_hcv/30min"
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
                    Our founder worked as a PT practice for 15 years. After
                    selling, he started a medical billing company and learned
                    how to train people from overseas. 
                  </p>
                </div>
              </div>
              <div className={styles.infoBox}>
                <img src="agency-3/meeting/targeting.png" alt="Vision" />
                <div>
                  <h3>Our Vision</h3>
                  <p>
                    There is an administrative position in every business and
                    organization so that each PT has better talent, freedom, and
                    profit.
                  </p>
                </div>
              </div>
              <div className={styles.infoBox}>
                <img src="agency-3/meeting/purpose.png" alt="Question" />
                <div>
                  <h3>Our Purpose</h3>
                  <p>
                    Our founder worked as a PT practice for 15 years. After
                    selling, he started a medical billing company and learned
                    how to train people from overseas.
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

// import React from 'react';
// import { InlineWidget } from "react-calendly";
// import styles from './MeetingSection.module.css';

// const MeetingSection = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.schedulingSection}>
//         <div className={styles.header}>
//           <img src="/globe.png" alt="Globe" />
//           <h2>Schedule Your Meeting</h2>
//           <p>Free 30-Minute Discovery Call</p>
//         </div>

//           <InlineWidget
//             url="https://calendly.com/abhishek-_hcv/30min"
//             styles={{
//               height: '8x00px',
//             }}
//           />

//       </div>
//       <div className={styles.infoSection}>
//         <div className={styles.infoBox}>
//           <img src="/question.png" alt="Question" />
//           <h3>Our Story</h3>
//           <p>
//             Our founder worked as a PT practice for 15 years. After selling, he
//             started a medical billing company and learned how to train people
//             from overseas. He was shocked at the talent that cost him so he
//             opened what he has learned with the world.
//           </p>
//         </div>
//         <div className={styles.infoBox}>
//           <img src="/vision.png" alt="Vision" />
//           <h3>Our Vision</h3>
//           <p>
//             There is an administrative position in every business and
//             organization so that each PT has better talent, freedom, and profit.
//             We believe we are bringing people out of poverty as we help PTs
//             reclaim freedom.
//           </p>
//         </div>
//         <div className={styles.infoBox}>
//           <img src="/purpose.png" alt="Purpose" />
//           <h3>Our Purpose</h3>
//           <p>To build and strengthen families.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingSection;
