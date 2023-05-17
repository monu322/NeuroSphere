import Link from 'next/link';

const PostPagination = ({ SingleBlog }) => {
  return (
    <div className="pagination">
      <span>
        <Link href="#0">
          <a>Prev Post</a>
        </Link>
      </span>
      <span className="icon">
        <Link href="/blog">
          <a><i className="fas fa-th-large"></i></a>
        </Link>
      </span>
      <span className="text-right">
        <Link href="#0">
          <a>Next Post</a>
        </Link>
      </span>
    </div>
  )
}

export default PostPagination