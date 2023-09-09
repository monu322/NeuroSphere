/* eslint-disable @next/next/no-img-element */
import IntroData from '../../../data/Home3/Intro.json';

const Intro = () => {
  return (
    <section className="ui-intro section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 valign md-mb50">
            <div className="cont">
              <span className="sm-title">{ IntroData.title }</span>
              <h4 className="gr-text">{ IntroData.text }</h4>
              <p>{ IntroData.subtext }</p>
              <p>{ IntroData.subtext }</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="img">
              <img src="agency-3/img/f1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro