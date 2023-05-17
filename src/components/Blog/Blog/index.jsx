/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import Link from 'next/link';
import BlogsData from '../../../data/Blogs/Blogs.json';

const Blog = () => {
  return (
    <section className="blog-pg section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="posts">
              {
                BlogsData.map((blog, index) => (
                  <div className={`item ${index !== BlogsData.length - 1 && 'mb-80'}`} key={blog.id}>
                    <div className="img">
                      <Link href="/blog/blog-details">
                        <a><img src={blog.img} alt="" /></a>
                      </Link>
                    </div>
                    <div className="content">
                      <div className="row">
                        <div className="col-10">
                            <a href="#0" className="date">
                              <span className="num">{ blog.date.day }</span>
                              <span>{ blog.date.month }</span>
                            </a>
                            <div className="tags">
                              {
                                blog.tags.map((tag, idx) => (
                                  <Link href="#0" key={idx}>
                                    <a>{ tag }</a>
                                  </Link>
                                ))
                              }
                            </div>
                            <h4 className="title">
                              <Link href="/blog/blog-details">
                                <a>{ blog.title }</a>
                              </Link>
                            </h4>
                            <p>
                              { blog.content }
                            </p>
                            <Link href="/blog/blog-details">
                              <a className="simple-btn mt-30">Read More</a>
                            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

              <div className="pagination">
                <span className="active">
                  <Link href="#0">
                    <a>1</a>
                  </Link>
                </span>
                <span>
                  <Link href="#0">
                    <a>2</a>
                  </Link>
                </span>
                <span>
                  <Link href="#0">
                    <a><i className="fas fa-angle-right"></i></a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog