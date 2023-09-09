/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import NoSSR from '../../NoSSR';
import ModalVideo from 'react-modal-video';
import VideoData from '../../../data/Home2/Video.json';

const Video = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let videoElem = document.querySelector('.video.bg-img[data-background]');
    if (videoElem) {
      videoElem.style.backgroundImage = `url(${videoElem.dataset.background})`;
      videoElem.style.backgroundRepeat = `no-repeat`;
      videoElem.style.backgroundSize = `cover`;
      videoElem.style.backgroundAttachment = `fixed`;
      videoElem.style.backgroundPosition = `center 153.162px`;
      window.onscroll = () => {
        let scroll = window.pageYOffset;
        if (scroll > 0) {
          videoElem.style.backgroundPosition = `center ${3000 - scroll * 0.75}px`;
        }
      };
    }
  }, []);

  return (
    <>
      <section className="video bg-img parallaxie" data-background="agency-2/img/bg.jpg">
        <div className="vid valign" onClick={() => setIsOpen(true)}>
          <div className="vid-butn">
            <span className="icon">
              <i className="fas fa-play"></i>
            </span>
          </div>
        </div>
        <div className="container">
          <div className="stauts">
            {
              VideoData.stauts.map((item) => (
                <div className="item" key={item.id}>
                  <h4>{ item.number }<span>{ item.numberOperator }</span> +</h4>
                  <h6>{ item.title }</h6>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <NoSSR>
        <ModalVideo
          channel={VideoData.video.channel}
          autoplay
          isOpen={isOpen}
          videoId={VideoData.video.channel}
          onClose={() => setIsOpen(false)}
        />
      </NoSSR>
    </>
  )
}

export default Video