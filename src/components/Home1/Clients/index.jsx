/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import ClientsData from '../../../data/Home1/Clients.json';
import createLoop from '../../../common/clientsLoop';

const Clients = () => {
  const clientsRef = useRef(null);

  useEffect(() => {
    createLoop(clientsRef);
  }, []);

  return (
    <div className="clients section-padding position-re">
      <div className="promo-carousel toleft mb-80">
        <div className="item-wrap" ref={clientsRef}>
          {
            ClientsData.Clients.map((item, index) => (
              <div className="items" key={index}>
                { item }
              </div>
            ))
          }
        </div>
      </div>
      <div className="container">
        <div className="box">
          {
            ClientsData.Brands.map((item, index) => (
              index <= 4 &&
              <div className="item" key={index}>
                <img src={item} alt="" />
              </div>
            ))
          }
        </div>
        <div className="box">
          {
            ClientsData.Brands.map((item, index) => (
              index > 4 &&
              <div className="item" key={index}>
                <img src={item} alt="" />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Clients