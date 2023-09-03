import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";

import db from "../../config/fire-config";
import { doc, getDoc } from "firebase/firestore";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import Slider from "react-slick";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { useRouter } from "next/router";

import CallAction from "../../components/About/CallAction";

import dynamic from "next/dynamic";
import Link from "next/link";
const Split = dynamic(() => import("../../components/Split"), { ssr: false });

const Index = ({ projectId, allWorks }) => {
  const testimonialsSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const router = useRouter();
  const currentWorkIndex = allWorks.findIndex((w) => w.projectId === projectId);
  const work = allWorks[currentWorkIndex];
  console.log("Work data");
  console.log(work);

  // const currentWorkIndex = work?.projectId;
  console.log("project id : " + currentWorkIndex);

  const getNextWorkIndex = () => {
    if (currentWorkIndex === allWorks.length - 1) {
      return 0;
    }
    return currentWorkIndex + 1;
  };

  const handleNextProjectClick = () => {
    const nextWorkIndex = getNextWorkIndex();
    const nextWorkId = allWorks[nextWorkIndex].projectId;
    router.push(`/casestudies/${nextWorkId}`);
  };

  useEffect(() => {
    let body = document.querySelector("body");
    body.classList.add("bg-gr");
    body.classList.remove("d3-dark");

    let elem = document.querySelector(".background.bg-img[data-background]");
    if (elem)
      elem.style.backgroundImage = `url(${elem.getAttribute(
        "data-background"
      )})`;
  }, []);

  return (
    <MainLayout footerClass="bg-gray">
      <section className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="img-wrapper bg-img parallaxie"
                data-overlay-dark="3"
              >
                <div className="title">
                  <div className="container container2 project-title-container">
                    <h4>{work?.description}</h4>
                    <br />
                    <br />
                    <a
                      rel="noreferrer"
                      href={work?.link}
                      target="_blank"
                      className="btn-curve btn-lit visit-proj-link"
                    >
                      <span>Visit Project</span>
                    </a>
                    <h3 className="work-title">{work?.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="intro-section section-padding pb-0 work-intro-section">
        <img className="wide-img" src={work?.wideImg} alt="image" />
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="htit sm-mb30 ">
                <h4>The Objective</h4>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1 col-md-8">
              <div className="text">
                <Split className="wow txt">
                  <p data-splitting>{work?.objective}</p>
                </Split>
              </div>
            </div>
          </div>
          <div className="row execution-row pt-4">
            <div className="col-lg-3 col-md-4 pt-2">
              <div className="htit sm-mb30">
                <h4>The Execution</h4>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1 col-md-8">
              <div className="text">
                <Split className="wow txt">
                  <p data-splitting>{work?.servicesIntro}</p>
                </Split>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="services section-padding">
        <div className="container">
          <div className="row">
            {work?.services?.map((service, index) => (
              <div className="col-lg-4 service-box" key={index}>
                <div
                  className={`item wow fadeInUp ${
                    index !== work.services.length - 1 && "md-mb50"
                  }`}
                  data-wow-delay={`${0.6}s`}
                >
                  <span className={`icon ${service?.serviceIconClass}`}></span>
                  <h6>
                    {index + 1}. {service?.serviceTitle}
                  </h6>
                  <p>{service.serviceDecription}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row execution-row mb-80 pt-4">
            <div className="col-lg-3 col-md-4">
              <div className="htit sm-mb30">
                <h4>The Outcome</h4>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1 col-md-8">
              <div className="text">
                <Split className="wow txt">
                  <p data-splitting>{work?.outcomeText}</p>
                </Split>
              </div>
            </div>
          </div>

          <div className="row">
            {work?.outcomes?.map((outcome, index) => (
              <div className="col-lg-6 service-box" key={index}>
                <div
                  className={`item wow fadeInUp ${
                    index !== work.outcomes.length - 1 && "md-mb50"
                  }`}
                  data-wow-delay={`${0.6}s`}
                >
                  <span className={`icon ${outcome?.outcomeIconClass}`}></span>
                  <h6>
                    {index + 1}. {outcome?.outcomeTitle}
                  </h6>
                  <p>{outcome?.outcomeDescription}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNextProjectClick}
            className="btn-curve btn-lit mt-4 "
          >
            <span>Next Project</span>
          </button>
        </div>
      </div>
      <section className="block-sec pt-4">
        <div
          className="background bg-img section-padding pb-0 "
          data-background="/assets/img/1.jpg"
          data-overlay-dark="6"
        >
          <div className="container mt-4 ">
            <div className="row">
              <div className="col-lg-6">
                <div className="vid-area">
                  <div className="vid-icon"></div>

                  <div className="cont">
                    <Split className="wow">
                      <h3 data-splitting>{work?.testimonialShortText}</h3>
                    </Split>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="testim-box">
                  <div className="head-box">
                    <h6 className="wow fadeIn" data-wow-delay=".5s">
                      Our Happy Clients
                    </h6>
                    <h4 className="wow fadeInLeft" data-wow-delay=".5s">
                      What Client Say?
                    </h4>
                    <Slider
                      {...testimonialsSliderSettings}
                      className="slic-item wow fadeInUp slick-dotted"
                      data-wow-delay=".5s"
                    >
                      {/* {work?.testimonials?.map((testimonial) => ( */}
                      {/* <div className="item" key={testimonial.id}> */}
                      <div className="item">
                        <p>{work?.testimonialContent}</p>
                        <div className="info">
                          <div className="img">
                            <div className="img-box">
                              <img src={work?.testimonialImg} alt="" />
                            </div>
                          </div>
                          <div className="cont">
                            <div className="author">
                              <h6 className="author-name custom-font">
                                {work?.testimonialName}
                              </h6>
                              <span className="author-details">
                                {work?.testimonialDetails}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ))} */}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Clients /> */}
      <CallAction />
    </MainLayout>
  );
};

export default Index;

const convertTimestampToDate = (timestamp) =>
  timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

export async function getServerSideProps(context) {
  try {
    const projectId = Number(context.query.id);
    console.log("project id from server : " + projectId);
    // const workDocRef = doc(db, "works", projectId);
    // const workDocSnapshot = await getDoc(workDocRef);
    // console.log("work exist : " + JSON.stringify(workDocSnapshot.data()));
    // if (workDocSnapshot.exists()) {
    //   // console.log("work exist : " + workDocSnapshot);
    //   const work = workDocSnapshot.data();

    //   const serializableWork = {
    //     ...work,
    //     date: work.date.toDate().toString(),
    //   };

    const workCollection = collection(db, "works");
    const q = query(workCollection, orderBy("date"));
    const querySnapshot = await getDocs(q);
    const allWorks = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      docData.date = convertTimestampToDate(docData.date).getTime();

      return {
        id: doc.id,
        ...docData,
      };
    });
    return {
      props: {
        // work: serializableWork,
        projectId,
        allWorks,
      },
    };
    // }
    // //  else {
    // //   console.log("No document found");
    // //   return {
    // //     notFound: true,
    // //   };
    // // }
  } catch (error) {
    console.error("Error fetching work data:", error);

    return {
      props: {
        work: null,
      },
    };
  }
}
