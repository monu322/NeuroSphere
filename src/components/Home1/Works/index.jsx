/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import worksData from '../../../data/Home1/Works.json';
import LightBoxGallery from './LightBoxGallery';

const Works = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = worksData.map(item => item.img ? { src: item.img, alt: "image" } : [{ src: item.first.img, alt: "image" }, { src: item.second.img, alt: "image" }]).flat(1);

  const openLightBox = (img) => {
    let imageIdx = images.findIndex(image => image.src === img);

    setIndex(imageIdx);
    setIsOpen(true);
  };

  useEffect(() => {
    Object.values(document.querySelectorAll('[data-tooltip-tit]')).forEach(element => {
      element.addEventListener('mouseover', function () {
        let tooltip = document.createElement('div');
        tooltip.classList.add('div-tooltip-tit');
        tooltip.innerText = this.getAttribute('data-tooltip-tit');
        document.body.appendChild(tooltip);
        
        tooltip.style.display = 'block';
        tooltip.innerHTML = this.getAttribute('data-tooltip-tit');
      });

      element.addEventListener('mouseout', function () {
        const tooltip = document.querySelector('.div-tooltip-tit');
        if (tooltip) tooltip.remove();
      });

      element.addEventListener('mousemove', function (e) {
        const tooltip = document.querySelector('.div-tooltip-tit');
        if (tooltip) {
          tooltip.style.top = `${e.pageY + 10}px`;
          tooltip.style.left = `${e.pageX + 20}px`;
        }
      });
    });

    Object.values(document.querySelectorAll('[data-tooltip-sub]')).forEach(element => {
      element.addEventListener('mouseover', function () {
        let tooltip = document.createElement('div');
        tooltip.classList.add('div-tooltip-sub');
        tooltip.innerText = this.getAttribute('data-tooltip-sub');
        document.body.appendChild(tooltip);
        
        tooltip.style.display = 'block';
        tooltip.innerHTML = this.getAttribute('data-tooltip-sub');
      });

      element.addEventListener('mouseout', function () {
        const tooltip = document.querySelector('.div-tooltip-sub');
        if (tooltip) tooltip.remove();
      });

      element.addEventListener('mousemove', function (e) {
        const tooltip = document.querySelector('.div-tooltip-sub');
        if (tooltip) {
          tooltip.style.top = `${e.pageY + 60}px`;
          tooltip.style.left = `${e.pageX + 20}px`;
        }
      });
    });

  }, []);

  return (
    <>
      <section className="works mason section-padding position-re pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="main-header text-center">
                <h6>Our Portfolio</h6>
                <h3>Unlimited experience.</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="gallery-img">
            {
              worksData.map((work, index) => {
                if (index === 0 || index === worksData.length - 1) {
                  return (
                    <div className="items valign" key={index}>
                      <div className="single-item">
                        <div className="popimg" onClick={() => openLightBox(work.img)}>
                          <div className="item-img" data-tooltip-tit={work.tooltip_title} data-tooltip-sub={work.tooltip_sub}>
                            <img src={work.img} alt="work image" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                
                return (
                  <div className="items valign" key={index}>
                    <div className="full-width">
                      <div className="single-item">
                        <div className="popimg" onClick={() => openLightBox(work.first.img)}>
                          <div className="item-img" data-tooltip-tit={work.first.tooltip_title} data-tooltip-sub={work.first.tooltip_sub}>
                            <img src={work.first.img} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="single-item">
                        <div className="popimg" onClick={() => openLightBox(work.second.img)}>
                          <div className="item-img" data-tooltip-tit={work.second.tooltip_title} data-tooltip-sub={work.second.tooltip_sub}>
                            <img src={work.second.img} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="bg-dark dark-botm"></div>
      </section>
      <LightBoxGallery images={images} index={index} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default Works