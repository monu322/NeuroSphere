import { Button } from "reactstrap";
import HeaderData from "../../../data/Book/Header.json";
import Link from "next/link";

const Header = () => {

  
  return (
    <section className="ui-intro pt-70 bg-gray">
      <div className="container">
        <div className="row"> {/* Add margin classes here */}
          <div className="col-lg-12 text-center">
            <Link href="/">
              <a className="logo">
                <img
                  src="/assets/img/neurosphere-logo.svg"
                  alt="logo"
                  style={{ maxWidth: "500px" }} // Adjust the max width as needed
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="row mt-70">
          <div className="col-lg-5 ">
            <h1>{HeaderData.text1}</h1>
            <h1>{HeaderData.text2}</h1>
            <span>{HeaderData.para}</span>
            <br/>
            <Link href="#meeting-section">
              <Button className="order mt-4 custom-button mb-40">
                <h6 className="button-text">Speak To Our Team Today</h6>
              </Button>
            </Link>
          </div>
          <div className="col-lg-5 offset-lg-1 pt-0 pt-md-4 pt-sm-4">
          <iframe
              src="/videos/intro.mp4"
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;



