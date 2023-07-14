import SkillsData from "../../../data/About/Skills.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Skills = () => {
  return (
    <section className="skills-circle bg-gray">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="m-md-5 pl-5">
            <div className="row pl-md-5">
              {SkillsData.map((skill, index) => (
                <div className="col-md-4" key={skill.id}>
                  <div
                    className={`item wow fadeInLeft${
                      index === 1 ? " d-md-block" : ""
                    }`}
                    data-wow-delay={`${index === 1 ? "0.6s" : "0.3s"}`}
                  >
                    <div className="skill" data-value={skill.value / 100}>
                      <span className="custom-font">
                        <CircularProgressbar
                          strokeWidth={2}
                          value={skill.value}
                          text={`${skill.value}%`}
                          styles={buildStyles({
                            pathColor: "#75DAB4",
                            trailColor: "#031117",
                            textColor: "#fff",
                          })}
                        />
                      </span>
                    </div>
                    <div className="cont">
                      <span>{skill.title}</span>
                      <h6>{skill.subtitle}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
