import dynamic from "next/dynamic";
const Split = dynamic(() => import("../../Split"), { ssr: false });

const Intro = ({ introData }) => {
  const IntroData = introData;
  return (
    <section className="intro-section section-padding pb-0">
      <div className="container">
        <div className="row mt-4 pt-4">
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="htit sm-mb30 mt-4">
              <h4>Who We Are ?</h4>
            </div>
          </div>
          <div className="col-lg-8 offset-lg-1 col-md-8">
            <div className="text">
              <Split className="wow txt">
                <p data-splitting>{IntroData.whoWeAre}</p>
              </Split>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
