const Header = ({ data }) => {
  //   console.log(data.title);
  return (
    <section className="page-header crs">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-9">
            <div className="cont text-center">
              {data ? (
                <>
                  <h2>{data.title}</h2>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
