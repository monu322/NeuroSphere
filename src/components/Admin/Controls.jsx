import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const Controls = () => {
  return (
    <div className=" admin-controls">
      <input type="text" />
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
          <li className="nav-item">
            <NavLink className="nav-align">
              <span className="icon pe-7s-user"></span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Controls;
