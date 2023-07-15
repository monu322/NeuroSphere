import ServicesData from "../../../data/Home1/Services.json";
const Services = ({ servicesData }) => {
  return (
    <div className="cls-services section-padding position-re mt-4 lg-pl60 lg-pr60">
      <div className="container mt-4 ssm-mb85">
        <div className="row ">
          {ServicesData.map((service, index) => {
            return (
              <div className="col-lg-4 services-div ssm-mt30" key={index}>
                <div className="item">
                  <div className="letr-bg">{service["letr-bg"]}</div>
                  <span className="numb">{service.numb}</span>
                  <h6>{service.title}</h6>
                  <p>{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
