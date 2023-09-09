import { useEffect } from 'react';
import Link from 'next/link';
import BlogsData from '../../../data/Home2/Blogs.json';

const Blogs = () => {
  useEffect(() => {
    let elems = Object.values(document.querySelectorAll('.item.bg-img[data-background]'));
    if (elems.length) {
      elems.forEach(el => {
        el.style.backgroundImage = `url(${el.getAttribute('data-background')})`;
      });
    }
  }, []);

  return (
    <section className="blog-grid section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="main-header">
              <h6>Our Blogs</h6>
              <h3 className="gr-text">Interesting articles.</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {
            BlogsData.map((blog, index) => (
              <div className="col-lg-4" key={blog.id}>
                <div
                  className={`item bg-img wow fadeInUp ${index !== BlogsData.length - 1 && 'md-mb50'} ${index === 1 && 'active'}`}
                  data-wow-delay={`${0.3 * index + 0.3}s`}
                  data-background={blog.img}
                >
                  <div className="cont">
                    <Link href="#0">
                      <a className="date">
                        <span><i>{ blog.date.day }</i> { blog.date.month }</span>
                      </a>
                    </Link>
                    <div className="info">
                      <Link href="#0">
                        <a className="author">
                          <span>{ blog.author }</span>
                        </a>
                      </Link>
                      <Link href="#0">
                        <a className="tag">
                          <span>{ blog.tag }</span>
                        </a>
                      </Link>
                    </div>
                    <h6>
                      <Link href="#0">
                        <a>{ blog.title }</a>
                      </Link>
                    </h6>
                    <div className="btn-more">
                      <Link href="#0">
                        <a className="simple-btn">Read More</a>
                      </Link>
                    </div>
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