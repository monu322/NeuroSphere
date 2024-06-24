import { useState } from 'react';
import Link from 'next/link';
import PricingData from "../../../data/Book/Pricing.json";

const PricingTable = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="pricing section-padding bg-gray">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="main-header">
              <h6>Pricing Tables</h6>
              <h3>Unlimited experience.</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {PricingData.map((plan, index) => (
            <div
              className="col-lg-4"
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className={`item ${index !== PricingData.length - 1 && 'md-mb50'} ${
                  activeIndex === index ? 'active' : ''
                }`}
              >
                <div className="title">
                  <h5>{plan.title}</h5>
                </div>
                <div className="amount">
                  <h2>
                    <span>$</span> {plan.amount}
                  </h2>
                  <h6>{plan.plan_type}</h6>
                </div>
                <div className="cont">
                  <ul>
                    {plan.features.map((item, featureIndex) => (
                      <li key={featureIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="order">
                  <Link href="#meeting-section">
                    <a>Contact Us</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
