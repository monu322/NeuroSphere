import { useState } from 'react';
import IntroVersData from '../../../data/Book/info.json';

const InfoSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="ui-intro pt-70">
                <div className="container">
                    <h4 className="gr-text text-center pb-70">OUR SERVICES</h4>
                    {IntroVersData.services.map((service, index) => (
                        <div key={index} className="row pb-70">
                            <div className={`col-lg-4 ${index % 2 === 0 ? '' : 'order-lg-2'}`}>
                                <div className="img">
                                    {/* <img src="agency-3/img/mobile-app.jpg" alt="" /> */}
                                    <img src={service.img} alt="jjjj" />
                                </div>
                            </div>
                            <div className={`col-lg-6 ${index % 2 === 0 ? 'offset-lg-2' : ''}`}>
                                <div className="cont">
                                    <div className="">
                                        <h5 className="gr-text">{service.title}</h5>
                                    </div>
                                    {service.points.map((point, idx) => (
                                        <p key={idx}>&#10003; {point}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
      
        </>
    );
};

export default InfoSection;