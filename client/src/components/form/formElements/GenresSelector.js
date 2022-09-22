import React from "react";
import { ImTree } from "react-icons/im";

const GenresSelector = ({ onClick, badge }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 translate-x-4 -translate-y-0.5 text-xs w-4 h-4 rounded-full flex items-center justify-center">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative flex items-center space-x-2 py-1 px-3 border-2 rounded dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary"
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  );
};

export default GenresSelector;
