import SkillsData from '../../../data/About/Skills.json';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Skills = () => {
  return (
    <section className="skills-circle bg-gray pt-50 pb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div>
              <div className="row">
                {
                  SkillsData.map((skill, index) => (
                    <div className="col-md-6" key={skill.id}>
                      <div className="item wow fadeInLeft" data-wow-delay={`${index === 1 ? '0.6' : '0.3'}`}>
                        <div className="skill" data-value={skill.value / 100}>
                          <span className="custom-font">
                            <CircularProgressbar
                              strokeWidth={2}
                              value={skill.value}
                              text={`${skill.value}%`}
                              styles={buildStyles({ pathColor: `#75DAB4`, trailColor: '#031117', textColor: '#fff' })}
                            />
                          </span>
                        </div>
                        <div className="cont">
                          <span>{ skill.title }</span>
                          <h6>{ skill.subtitle }</h6>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills