/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import NoSSR from '../../NoSSR';
import ModalVideo from 'react-modal-video';
import IntroVersData from '../../../data/Home3/IntroVers.json';

const IntroVers = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="ui-intro vers section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 md-mb50">
                            <div className="img">
                                <img src="agency-3/img/f2.jpg" alt="" />
                                <div className="vid valign" style={{ display: 'none' }} onClick={() => setIsOpen(true)}>
                                    <div className="vid-butn">
                                        <span className="icon">
                                            <i className="fas fa-play"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-2 valign">
                            <div className="cont">
                                <span className="sm-title">{ IntroVersData.title }</span>
                                <h4 className="gr-text">{ IntroVersData.text }</h4>
                                <p>{ IntroVersData.subtext }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <NoSSR>
                <ModalVideo
                    channel={IntroVersData.video.channel}
                    autoplay
                    isOpen={isOpen}
                    videoId={IntroVersData.video.channel}
                    onClose={() => setIsOpen(false)}
                />
            </NoSSR>
        </>
    )
}

export default IntroVers