import SingleBlog from '../../../../data/Blogs/Single-Blog.json';

const Header = () => {
  return (
    <section className="page-header blg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-9">
            <div className="cont text-center">
              <h2>{ SingleBlog.title }</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header