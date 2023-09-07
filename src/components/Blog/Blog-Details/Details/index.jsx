import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PostImage from "./PostImage";
import PostContent from "./PostContent";
import PostPagination from "./PostPagination";
import PostCommentsArea from "./PostCommentsArea";
import PostCommentsForm from "./PostCommentsForm";

const Details = ({ blog, currentIndex, totalBlogs, blogs }) => {
  const article = blog;
  const Blogs = blogs;
  const CurrentIndex = currentIndex;
  const NextIndex = CurrentIndex + 1;
  const PreviousIndex = CurrentIndex - 1;
  const NextBlog = Blogs[NextIndex];
  const PreviousBlog = Blogs[PreviousIndex];
  const TotalBlogs = totalBlogs;
  // const date = new Date(article.postedDate);
  // const day = date.getDate();
  // const month = date.toLocaleString("default", { month: "long" });
  // const year = date.getFullYear();
  // article.postedDate = `${day} ${month} ${year}`;

  useEffect(() => {}, []);

  return (
    <>
      <section className="page-header blog-header blg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="cont">
                <h1 className="blog-title">{article?.title}</h1>
                <span>{article?.posterName + ", "}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-pg single section-padding pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              {article && (
                <div className="post">
                  {/* Image */}
                  <PostImage SingleBlog={article} />
                  {/* Content */}
                  <PostContent SingleBlog={article} />
                  {/* Pagination */}
                  <PostPagination
                    SingleBlog={article}
                    currentIndex={CurrentIndex}
                    totalBlogs={TotalBlogs}
                    nextIndex={NextIndex}
                    previousIndex={PreviousIndex}
                    nextBlog={NextIndex > TotalBlogs ? Blogs[0] : NextBlog}
                    previousBlog={PreviousIndex < 0 ? Blogs[0] : PreviousBlog}
                    blogs={Blogs}
                  />
                  {/* Comments Area */}
                  {/* <PostCommentsArea SingleBlog={article} /> */}
                  {/* Comments Form */}
                  <PostCommentsForm SingleBlog={article} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
