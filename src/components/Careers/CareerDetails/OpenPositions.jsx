import Link from "next/link";
import OpeningsData from "../../../data/Careers/Openings.json";

const OpenPositions = () => {
  return (
    <div className="services section-padding">
      <div className="container">
        {OpeningsData.map((opening, index) => (
          <div
            key={opening.title}
            className={`openings-box ${
              index !== OpeningsData.length - 1 && "md-mb50"
            }`}
            data-wow-delay={`${0.3 * index + 0.3}s`}
          >
            <div>
              <h6>{opening.title}</h6>
              <p>{opening.description}</p>
            </div>
            <Link href="/careers/career-details/">
              <a>
                <span>Apply</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenPositions;