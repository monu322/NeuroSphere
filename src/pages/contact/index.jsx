import { useEffect } from "react";
import ContactLayout from "../../layouts/contact";
import ContactDetails from "../../components/Contact/ContactDetails";
import ContactMap from "../../components/Contact/ContactMap";

const Index = () => {
  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  return (
    <ContactLayout footerClass="bg-gray">
      <ContactDetails />
      <div className="map-container"><iframe
        title="map"
        width='100%'
        height='100%'
        className="gmap_iframe"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15782.143080690665!2d76.9413097!3d8.5443668!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05b96a8025dc21%3A0x433a8ad4eeb21137!2sB-HUB!5e0!3m2!1sen!2suk!4v1685569913045!5m2!1sen!2suk"
      ></iframe></div>
    </ContactLayout>
  )
}

export default Index