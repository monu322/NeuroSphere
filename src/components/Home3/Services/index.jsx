import ServicesData from '../../../data/Home3/Services.json';

const Services = () => {
  return (
    <section className="ui-services bg-gray section-padding">
      <div className="container">
        <div className="row">
          {
            ServicesData.map((service, index) => (
              <div className="col-lg-4" key={index}>
                <div className={`item ${index !== ServicesData.length - 1 && 'md-mb50'}`}>
                  <div className="letr-bg">{ service.lettrBg }</div>
                  <span className={`icon ${service.iconClass}`}></span>
                  <h6>{ service.title }</h6>
                  <p>{ service.desc }</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Services