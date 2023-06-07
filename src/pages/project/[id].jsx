import { useEffect, useState} from "react";
import MainLayout from "../../layouts/main";

import { useRouter } from "next/router";

import Header from "../../components/About/Header";
import Intro from "../../components/About/Intro";
import Minimal from "../../components/About/Minimal";
import Services from "../../components/About/Services";
import Testimonials from "../../components/About/Testimonials";
import Skills from "../../components/About/Skills";
import Team from "../../components/About/Team";
import Clients from "../../components/About/Clients";
import CallAction from "../../components/About/CallAction";

import WorksData from '../../data/Home3/Works.json';
import dynamic from 'next/dynamic';
const Split = dynamic(() => import("../../components/Split"), { ssr: false });

const Index = () => {

  const router = useRouter();
  const [work, setWork] = useState({});
  const id = router.query.id;

  useEffect(() => {
    if (!id) <h1>Loading...</h1>;
    else setWork(WorksData.works?.find((item) => item.id == id));

    return () => {};
  }, [id]);

  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");
  }, []);

  useEffect(() => {
    let elem = document.querySelector('.img-wrapper.bg-img[data-background]');


    console.log('element',elem)

    if (elem) {

      

      elem.style.backgroundImage = `url(${elem.getAttribute('data-background')})`;
      elem.style.backgroundRepeat = `no-repeat`;
      elem.style.backgroundSize = `cover`;
      elem.style.backgroundAttachment = `fixed`;
      elem.style.backgroundPosition = `center 387.2px`;
      window.onscroll = () => {
        let scroll = window.pageYOffset;
        if (scroll > 0) {
          elem.style.backgroundPosition = `center ${387.2 - scroll * 0.75}px`;
        }
      };
    }
  }, []);

  return (
    <MainLayout footerClass="bg-gray">
      <section className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-9">
              <div className="cont">
                <h4>
                  {work?.description}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="img-wrapper bg-img parallaxie" data-background={work?.img} data-overlay-dark="3">
          <div className="title">
            <div className="container">
              <h3>{work?.title}</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="intro-section section-padding pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="htit sm-mb30">
                <h4>How we did it ?</h4>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1 col-md-8">
              <div className="text">
                <Split className="wow txt">
                  <p data-splitting>
                    { work.description }
                  </p>
                </Split>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <Testimonials />
      <Skills />
      <Team />
      <Minimal />
      {/* <Clients /> */}
      <CallAction />
    </MainLayout>
  )
}

export default Index