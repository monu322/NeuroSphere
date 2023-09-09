/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import BlogsData from "../../../data/Home1/Blogs.json";

const Blogs = () => {
  return (
    <section className="cls-blog section-padding position-re">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="main-header text-center">
              <h6>Our Blogs</h6>
              <h3>Interesting articles.</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {
            BlogsData.map((blog) => (
              <div className="col-lg-4" key={blog.id}>
                <div className="item md-mb50">
                  <div className="img">
                    <img src={blog.img} alt="" />

                    <div className="tag">
                      <Link href="#0">
                        <a>{ blog.tag }</a>
                      </Link>
                    </div>
                  </div>
                  <div className="cont">
                    <div className="info">
                      <h6>By { blog.author } <span>{ blog.date }</span></h6>
                    </div>
                    <h5>
                      <Link href="#0">
                        <a>{ blog.title }</a>
                      </Link>
                    </h5>
                    <Link href="#0">
                      <a className="more">Read More</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Blogs