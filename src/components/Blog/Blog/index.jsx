/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import Link from 'next/link';
import Blogs from '../../../data/Blogs/Blogs.json';

const Blog = () => {

  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }


  return (
    <section className="blog-pg section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="posts">
              {
                Blogs.map((blog, index) => (
                  <div className={`item ${index !== Blogs.length - 1 && 'mb-80'}`} key={blog.id}>
                    <div className="img mt-4">
                      <Link href="/blog/blog-details">
                        <a><img src={blog.img} alt="" /></a>
                      </Link>
                    </div>
                    <div className="content">
                      <div className="row">
                        <div className="col-10">
                            <a href="#0" className="date">
                              <span className="num">
                                {blog.date}
                             </span>
                            </a>
                            <div className="tags">
                              {
                                blog?.tags?.map((tag, idx) => (
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
                              { blog?.postContent?blog.postContent.map((content)=>{
                                return(
                                  <>
                                    <h3>{content.heading}</h3>
                                    <p>{content.paragraphs}</p>
                                     {content.images?content.images.map((img)=>{
                                         return(
                                          <>
                                           <div className='img p-4'>
                                            <img key={blog.id}
                                             className="img-sec"
                                             src = {img}
                                             alt = {content.heading}
                                             />
                                           </div>
                                          </>
                                           )
                                       }):" " }
                                  </>
                                )
                              }):" " }
                            </p>
                            <Link href={`/blog/${convertToSlug(blog.title)}-${blog.id}`}>
                              <a className="simple-btn mt-30">Read More</a>
                            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

              {/* <div className="pagination">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog