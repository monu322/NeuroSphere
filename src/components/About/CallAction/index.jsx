import { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Split = dynamic(() => import("../../Split"), { ssr: false });

const CallAction = () => {
  useEffect(() => {
    const bg = document.querySelector(".call-action.bg-img");
    if (bg) bg.style.backgroundImage = `url(${bg.getAttribute("data-background")})`;
  }, []);

  return (
    <div className="call-action section-padding bg-img" data-background="/assets/img/pattern.png">
      <div className="container mt-4 pt-4">
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <div className="content sm-mb30">
              <Split className="wow">
                <h6 data-splitting>Let’s Talk</h6>
              </Split>
              <Split className="wow custom-font">
                <h2 data-splitting>about your <b>next project</b>.</h2>
              </Split>
            </div>
          </div>

          <div className="call-action col-md-4 col-lg-3 valign mt-2">
            <Link href="/contact">
              <a className="btn-curve btn-lit mt-4 "><span>Get In Touch</span></a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallAction