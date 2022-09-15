import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ path, children }) => {
  return (
    <Link
      to={path}
      className="dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary transition"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
