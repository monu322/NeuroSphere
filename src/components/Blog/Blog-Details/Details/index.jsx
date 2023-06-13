import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PostImage from "./PostImage";
import PostContent from "./PostContent";
import PostPagination from "./PostPagination";
import PostCommentsArea from "./PostCommentsArea";
import PostCommentsForm from "./PostCommentsForm";

export async function getServerSideProps() {
  const { params } = context;
  const id = params.id;
  console.log("static props");
  return {
    context: context,
  };
}

const Details = ({ context }) => {
  const router = useRouter();
  const slug = router.query.id;

  if (slug) {
    const array = slug.split("-");
    const id = array[array.length - 1];

    let url = `/assets/data/articles/${id}.json`;

    console.log("id", context);

    const blogPost = fetch(url)
      .then((res) => res.json())
      .then((json) => setArticle(json));

    console.log("blog post:", blogPost);
  }

  const [article, setArticle] = useState({});

  useEffect(() => {
    if (!slug) <h1>Loading...</h1>;
    else {
      const array = slug.split("-");
      const id = array[array.length - 1];

      let url = `/assets/data/articles/${id}.json`;
      fetch(url)
        .then((res) => res.json())
        .then((json) => setArticle(json));
    }

    return () => {};
  }, [slug]);

  return (
    <>
      <section className="page-header blog-header blg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="cont">
                <h2>{article?.title}</h2>
                <span>by Monu John, July 17th 2023 </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-pg single section-padding pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              {article.title && (
                <div className="post">
                  {/* Image */}
                  <PostImage SingleBlog={article} />
                  {/* Content */}
                  <PostContent SingleBlog={article} />
                  {/* Pagination */}
                  <PostPagination SingleBlog={article} />
                  {/* Comments Area */}
                  <PostCommentsArea SingleBlog={article} />
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
