/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect } from "react";
// import ClientsData from '../../../data/About/Clients.json';
import createLoop from "../../../common/clientsLoop";

const Clients = ({ ClientsData }) => {
  const clientsRef = useRef(null);

  useEffect(() => {
    createLoop(clientsRef);
  }, []);

  return (
    <div className="clients light section-padding position-re">
      <div className="promo-carousel toleft mb-80">
        <div className="item-wrap" ref={clientsRef}>
          {ClientsData.Clients.map((item, index) => (
            <div className="items" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="box">
          {ClientsData.Brands.map(
            (brand, index) =>
              index < 5 && (
                <div className="item" key={index}>
                  <div className="img">
                    <img src={brand} alt="" />
                  </div>
                </div>
              )
          )}
        </div>
        <div className="box">
          {ClientsData.Brands.map(
            (brand, index) =>
              index >= 5 && (
                <div className="item" key={index}>
                  <div className="img">
                    <img src={brand} alt="" />
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
