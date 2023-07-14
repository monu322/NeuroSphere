import Link from "next/link";
import dynamic from "next/dynamic";
const Split = dynamic(() => import("../../Split"), { ssr: false });
import ContactInfoData from "../../../data/contact.json";

const ContactInfo = () => {
  return (
    <div className="col-lg-5 offset-lg-1">
      <div className="cont-info">
        <h4 className="extra-title mb-25 mt-50">Contact Info.</h4>
        <Split className="custom-font wow">
          <h3 data-splitting>Let&apos;s Talk.</h3>
        </Split>
        <div className="item mb-40">
          <h5>
            <Link href="#0">
              <a>{ContactInfoData.email}</a>
            </Link>
          </h5>
          <h5>{ContactInfoData.phone}</h5>
        </div>
        <Split className="custom-font wow">
          <h3 data-splitting>Visit Us.</h3>
        </Split>
        <div className="item">
          <h6>
            {ContactInfoData.address.street}, <br />
            {ContactInfoData.address.city}, {ContactInfoData.address.country}
          </h6>
        </div>
        <div className="social mt-50">
          <Link href="#0">
            <a className="icon">
              <i className="fab fa-facebook-f"></i>
            </a>
          </Link>
          <Link href="#0">
            <a className="icon">
              <i className="fab fa-twitter"></i>
            </a>
          </Link>
          <Link href="#0">
            <a className="icon">
              <i className="fab fa-pinterest"></i>
            </a>
          </Link>
          <Link href="#0">
            <a className="icon">
              <i className="fab fa-behance"></i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
