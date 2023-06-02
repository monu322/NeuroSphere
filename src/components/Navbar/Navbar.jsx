/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import getSiblings from '../../common/getSiblings'

const Navbar = ({ navbarRef, logoRef }) => {

  const handleDropdown = (e) => {
    getSiblings(e.target.parentElement).filter((item) => item.classList.contains("show")).map((item) => {
      item.classList.remove("show");
      if (item.childNodes[0]) item.childNodes[0].setAttribute("aria-expanded", false);
      if (item.childNodes[1]) item.childNodes[1].classList.remove("show");
    });

    e.target.parentElement.classList.toggle("show");
    e.target.setAttribute("aria-expanded", true);
    e.target.parentElement.childNodes[1].classList.toggle("show");
  };

  const handleMobileDropdown = (e) => {
    document.getElementById("navbarSupportedContent").classList.toggle("show-with-trans");
  };

  return (
    <nav className="navbar navbar-expand-lg" ref={navbarRef}>
        <div className="container">

            {/* Logo  */}
            <Link href="/">
              <a className="logo">
                <img src="/assets/img/neurosphere-logo.svg" alt="logo" ref={logoRef} />
              </a>
            </Link>
            

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleMobileDropdown}
            >
              <span className="icon-bar">
                <i className="fas fa-bars"></i>
              </span>
            </button>

            {/* navbar links */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <Link href="/"><li className="nav-item">
                  <span className="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Home
                  </span>
                  
                </li></Link>
                <li className="nav-item">
                  <Link href="/about">
                    <a className="nav-link">About</a>
                  </Link>
                </li>
                <Link href="/works1"><li className="nav-item">
                  <span className="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Portfolio</span>
                  <div className="dropdown-menu">
                    <Link href="/works1">
                      <a className="dropdown-item">Masonry 3 Columns</a>
                    </Link>
                    <Link href="/works2">
                      <a className="dropdown-item">Masonry 2 Columns</a>
                    </Link>
                    <Link href="/works3">
                      <a className="dropdown-item">Pinterest List</a>
                    </Link>
                  </div>
                </li></Link>
                {/* <li className="nav-item">
                  <Link href="/blog">
                    <a className="nav-link">Blog</a>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link href="/contact">
                    <a className="nav-link">Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar