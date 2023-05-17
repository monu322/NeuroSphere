import PostImage from './PostImage';
import PostContent from './PostContent';
import PostPagination from './PostPagination';
import PostCommentsArea from './PostCommentsArea';
import PostCommentsForm from './PostCommentsForm';

import SingleBlog from '../../../../data/Blogs/Single-Blog.json';

const Details = () => {
  return (
    <section className="blog-pg single section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="post">
              {/* Image */}
              <PostImage SingleBlog={SingleBlog} />
              {/* Content */}
              <PostContent SingleBlog={SingleBlog} />
              {/* Pagination */}
              <PostPagination SingleBlog={SingleBlog} />
              {/* Comments Area */}
              <PostCommentsArea SingleBlog={SingleBlog} />
              {/* Comments Form */}
              <PostCommentsForm SingleBlog={SingleBlog} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Details
