/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import createLoop from '../../../common/clientsLoop';
import ClientsData from '../../../data/Home2/Clients.json';

const Clients = () => {
  const clientsRef = useRef(null);

  useEffect(() => {
    createLoop(clientsRef);
  }, []);

  return (
    <section className="clients-ui section-padding bg-gray">
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
        <div className="row box">
          <div className="col-4 item valign">
            <div className="exp">
              <h2 className="gr-text">{ ClientsData.number }</h2>
            </div>
          </div>
          {
            ClientsData.Brands.map((brand, index) => (
              index < 8 && index % 2 === 0 &&
              <div className="col-2 item" key={index}>
              <div className="img">
                <img src={brand} alt="" />
              </div>
                <div className="img">
                  <img src={ClientsData.Brands[index + 1]} alt="" />
                </div>
              </div>
            ))
          }
        </div>
        <div className="row box">
          {
            ClientsData.Brands.map((brand, index) => (
              index >= 8 &&
              <div className="col-2 item" key={index}>
                <div className="img">
                  <img src={brand} alt="" />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Clients