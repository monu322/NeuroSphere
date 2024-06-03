import { useState } from "react";
import Link from "next/link";
import { Button } from "reactstrap";
import NoSSR from "../../NoSSR";
import ModalVideo from "react-modal-video";
import IntroVersData from "../../../data/Book/IntroVers.json";

const IntroVers = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="ui-intro pt-70 bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="cont">
                <h4 className="gr-text">Why You Will Love...</h4>
                {IntroVersData.paragraphs.map((para, index) => (
                  <p key={index}>&#10003; {para}</p>
                ))}
              </div>

              <Link href="#meeting-section">
                <Button className="order mt-3 custom-button">
                  <h6 className="button-text">Speak To Our Team Today</h6>
                </Button>
              </Link>
            </div>
            <div className="col-lg-4 md-mb50">
              <div className="img">
                <img src="agency-3/img/why-choose.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <NoSSR>
        <ModalVideo
          channel={IntroVersData.video.channel}
          autoplay
          isOpen={isOpen}
          videoId={IntroVersData.video.videoId}
          onClose={() => setIsOpen(false)}
        />
      </NoSSR>
    </>
  );
};

export default IntroVers;
