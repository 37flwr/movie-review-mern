import classNames from "classnames";
import React from "react";

const OptionButton = ({ type, children, onClick }) => {
  const renderBtnColor = (type) => {
    switch (type) {
      case "delete":
        return "bg-red-400";
      case "edit":
        return "bg-green-500";
      default:
        return "bg-white";
    }
  };

  return (
    <button
      className={classNames(
        "p-2 rounded-full text-primary hover:opacity-80 transition",
        renderBtnColor(type)
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OptionButton;
