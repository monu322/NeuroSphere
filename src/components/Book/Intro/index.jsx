/* eslint-disable @next/next/no-img-element */
import IntroData from '../../../data/Book/Intro.json';

const Intro = () => {
  return (
    <section className="ui-intro section-padding bg-gray">
      <div className="container">
        <div className="row align-items-center "> {/* Added align-items-center to vertically center the content */}
          <div className="col-lg-5 col-md-6">
            <div className="round-container">
              <img src="/assets/img/logo-light.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="cont">
              {/* <span className="sm-title">{ IntroData.title }</span> */}
              <h4 className="gr-text">{ IntroData.text }</h4>
              <p>{ IntroData.subtext1 }</p>
              <p>{ IntroData.subtext2 }</p>
              <p>{ IntroData.subtext3 }</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro


