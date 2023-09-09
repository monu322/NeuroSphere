import Link from 'next/link';
import PricingData from "../../../data/Home3/Pricing.json";

const Pricing = () => {
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
          {
            PricingData.map((plan, index) => (
              <div className="col-lg-4" key={index}>
                <div className={`item ${index !== PricingData.length - 1 && 'md-mb50'} ${index == 1 && 'active'}`}>
                  <div className="title">
                    <h5>{ plan.title }</h5>
                  </div>
                  <div className="amount">
                    <h2><span>$</span> { plan.amount }</h2>
                    <h6>{ plan.plan_type }</h6>
                  </div>
                  <div className="cont">
                    <ul>
                      {
                        plan.features.map((item, index) => (
                          <li key={index}>{ item }</li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="order">
                    <Link href="#0">
                      <a>Subscribe</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Pricing