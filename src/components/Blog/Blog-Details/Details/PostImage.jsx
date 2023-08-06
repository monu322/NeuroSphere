/* eslint-disable @next/next/no-img-element */

const PostImage = ({ SingleBlog }) => {
  return (
    <div className="img">
      <img src={SingleBlog?.img} alt="Image" />
    </div>
  );
};

export default PostImage;
