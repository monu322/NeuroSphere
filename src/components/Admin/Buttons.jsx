import Link from "next/link";
import React from "react";

const ButtonsAction = ({ to, onDeleteClick, id, postContent }) => {
  const handleOnClick = (id) => {
    onDeleteClick(id);
  };

  return (
    <div className="d-flex justify-content-evenly align-items-center mr-1">
      {postContent ? (
        <Link href={`/admin/${to}`}>
          <a>
            <button className="control_btn fas edit fa-edit mr-3"></button>
          </a>
        </Link>
      ) : (
        <Link href={`/admin/${to}`}>
          <a>
            <button className="control_btn fas edit fa-edit mr-3"></button>
          </a>
        </Link>
      )}
      <button
        className="control_btn delete fas fa-trash-alt"
        onClick={() => handleOnClick(id)}
      ></button>
    </div>
  );
};

export default ButtonsAction;
