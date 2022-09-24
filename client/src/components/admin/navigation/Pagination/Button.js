import React from "react";

const Button = ({ disabled, onClick, children }) => (
  <button
    disabled={disabled}
    type="button"
    className="text-primary dark:text-white enabled:hover:underline enabled:cursor:pointer disabled:opacity-50"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
