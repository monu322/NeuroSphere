import Link from "next/link";

const PostPagination = ({
  SingleBlog,
  currentIndex,
  totalBlogs,
  nextBlog,
  nextIndex,
  previousBlog,
  previousIndex,
  blogs,
}) => {
  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  return (
    <div className="pagination">
      <span>
        <Link
          href={`/blog/${convertToSlug(
            nextBlog?.title
          )}-${previousIndex}-${totalBlogs}-${previousBlog?.id}`}
        >
          <a>Prev Post</a>
        </Link>
      </span>
      <span className="icon">
        <Link href="/blog">
          <a>
            <i className="fas fa-th-large"></i>
          </a>
        </Link>
      </span>
      <span className="text-right">
        <Link
          href={`/blog/${convertToSlug(
            nextBlog?.title
          )}-${nextIndex}-${totalBlogs}-${nextBlog?.id}`}
        >
          <a>Next Post</a>
        </Link>
      </span>
    </div>
  );
};

export default PostPagination;
