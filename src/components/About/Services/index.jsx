import ServicesData from '../../../data/About/Services.json';

const Services = () => {
  return (
    <div className="services section-padding">
      <div className="container">
        <div className="row">
          {
            ServicesData.map((service, index) => (
              <div className="col-lg-4" key={service.id}>
                <div className={`item wow fadeInUp ${index !== ServicesData.length - 1 && 'md-mb50'}`} data-wow-delay={`${0.3 * index + 0.3}s`}>
                  <span className={`icon ${service.iconClass}`}></span>
                  <h6>{ service.title }</h6>
                  <p>{ service.details }</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Services