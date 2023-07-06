import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { auth } from "../../config/fire-config";
import { AuthContext } from "../../context/AuthProvider";
import { useRouter } from "next/router";

const Controls = () => {
  const authInfo = useContext(AuthContext);
  const router = useRouter();
  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("authInfo");
    router.push("/");
  };

  return (
    <div className=" admin-controls">
      <input type="text" placeholder="Search" />
      <div className="user-details">
        <ul className="d-flex justify-content-between">
          <li className="nav-item ">
            <NavLink className="nav-align">
              <span className="icon pe-7s-sun"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-next-2"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-portfolio"></span>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-user"></span>
            </NavLink>
          </li> */}
          {authInfo.isLoggedIn && (
            <li>
              <button onClick={handleLogOut} className="logout_admin mr-2 mt-2">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Controls;
