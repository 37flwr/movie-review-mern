import React from "react";

const BoxTitle = ({ title }) => {
  return (
    <h1 className="text-2xl font-semibold mb-2 text-primary dark:text-white">
      {title}
    </h1>
  );
};

export default BoxTitle;
