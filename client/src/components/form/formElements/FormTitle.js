import React from "react";

const FormTitle = ({ children }) => {
  return (
    <h1 className="text-xl dark:text-white text-secondary text-white font-semibold text-center">
      {children}
    </h1>
  );
};

export default FormTitle;
