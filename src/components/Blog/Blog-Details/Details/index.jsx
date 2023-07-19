import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PostImage from "./PostImage";
import PostContent from "./PostContent";
import PostPagination from "./PostPagination";
import PostCommentsArea from "./PostCommentsArea";
import PostCommentsForm from "./PostCommentsForm";

const Details = ({ blog }) => {
  const article = blog;
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
                <h2>{article?.title}</h2>
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
                  <PostPagination SingleBlog={article} />
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
