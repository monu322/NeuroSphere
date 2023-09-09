/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Link from "next/link";

const Blog = ({ data }) => {
  const blogs = data.filter((blog) => blog.isPublished === true);
  console.log(blogs);
  const totalBlogs = blogs.length - 1;
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
              {blogs?.map((blog, index) => (
                <div
                  className={`item ${index !== blogs.length - 1 && "mb-80"}`}
                  key={blog.id}
                >
                  <div className="img">
                    <Link
                      href={`/blog/${convertToSlug(blog.title)}-${
                        index + 1
                      }-${totalBlogs}-${blog.id}`}
                    >
                      <a>
                        <img src={blog.img} alt="" />
                      </a>
                    </Link>
                  </div>
                  <div className="content">
                    <div className="row">
                      <div className="col-10">
                        <a href="#0" className="date">
                          <span className="num">{blog.postedDate}</span>
                        </a>
                        <div className="tags">
                          {blog?.tags?.map((tag, idx) => (
                            <Link href="#0" key={idx}>
                              <a>{tag}</a>
                            </Link>
                          ))}
                        </div>
                        <h4 className="title">
                          <Link
                            href={`/blog/${convertToSlug(blog.title)}-${
                              index + 1
                            }-${totalBlogs}-${blog.id}`}
                          >
                            <a>{blog.title}</a>
                          </Link>
                        </h4>
                        <p>{blog.postDescriptions}</p>
                        <Link
                          href={`/blog/${convertToSlug(blog.title)}-${
                            index + 1
                          }-${totalBlogs}-${blog.id}`}
                        >
                          <a className="simple-btn mt-30">Read More</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

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
  );
};

export default Blog;
