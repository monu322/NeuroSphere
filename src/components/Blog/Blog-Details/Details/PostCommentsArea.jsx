/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const PostCommentsArea = ({ SingleBlog }) => {
  return (
    <div className="comments-area">
      <h5>Comments :</h5>
      {
        SingleBlog?.comments?.map((comment, index) => (
          <div className={`item ${comment.replay && 'relped'}`} key={index}>
            <div className="comment-img">
              <img src={comment.author.img} alt="" />
            </div>
            <div className="info">
              <h6>{ comment.author.name } - <span> { comment.date }</span></h6>
              <span className="replay">
                <Link href="#0">
                  <a>Replay <i className="fas fa-reply"></i></a>
                </Link>
              </span>
              <p>
                { comment.content }
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PostCommentsArea