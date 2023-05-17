import dynamic from 'next/dynamic';
const Split = dynamic(() => import("../../Split"), { ssr: false });
import IntroData from '../../../data/About/Intro.json';

const Intro = () => {
  return (
    <section className="intro-section section-padding pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="htit sm-mb30">
              <h4>Who We Are ?</h4>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-md-8">
            <div className="text">
              <Split className="wow txt">
                <p data-splitting>
                  { IntroData.whoWeAre }
                </p>
              </Split>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro