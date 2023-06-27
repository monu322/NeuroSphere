/* eslint-disable @next/next/no-img-element */
import IntroData from '../../../data/Home2/Intro.json';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Intro = () => {
  return (
    <section className="intro section-padding pb-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="main-header text-center">
              <h6>{ IntroData.title }</h6>
              <h3 className="gr-text">{ IntroData.text }</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="cont md-mb50">
              <span className="sm-title gr-text">{ IntroData.title }</span>
              <h4>{ IntroData.desc }</h4>
              <div className="skills-circle">
                {
                  IntroData.skills.map((item, index) => (
                    <div className="item" key={index}>
                      <div className="skill" data-value={item.value / 10}>
                        <span className="custom-font">
                          <CircularProgressbar
                            strokeWidth={2}
                            value={item.value}
                            text={`${item.value}%`}
                            styles={buildStyles({ pathColor: `#75DAB4`, trailColor: '#031117', textColor: '#fff' })}
                          />
                        </span>
                        <h6>{ item.title }</h6>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="feat ">
              <div className="row">
                {
                  IntroData.features.map((item, index) => (
                    <div className="col-lg-6" key={index}>
                      <div className="item md-mb 50">
                        <div className="img">
                          <img src={item.img} alt="" />
                        </div>
                        <h5>{ item.title }</h5>
                        <p>{ item.desc }</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro