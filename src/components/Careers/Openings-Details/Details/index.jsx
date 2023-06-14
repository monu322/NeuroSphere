import React from "react";
import CareerSection from "../../../../data/Careers/Career-Section.json";

const index = ({ data }) => {
  return (
    <div className="container">
      <div className="crs item">
        <h5>About Neurosphere</h5>
        {CareerSection.about.map((about, i) => {
          return <p key={i}>{about}</p>;
        })}
      </div>
      {data ? (
        <>
          <div className="crs item">
            <h5>Job Description</h5>
            <p>{data.description}</p>
          </div>
          <div className="crs item">
            <h5>Requirements</h5>
            <ul>
              {data.requirements.map((require, i) => {
                return <li key={i}>{require}</li>;
              })}
            </ul>
          </div>
        </>
      ) : null}

      <div className="crs item">
        <h5>Benefits</h5>
        <ul>
          {CareerSection.benefits.map((benefits, i) => {
            return <li key={i}>{benefits}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default index;
