import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../../hooks";

const Header = ({ modalVisibility, onAddMovieClick, onAddActorClick }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const { toggleTheme } = useTheme();

  const options = [
    { onClick: onAddMovieClick, title: "Add Movie" },
    { onClick: onAddActorClick, title: "Add Actor" },
  ];

  useEffect(() => {
    if (modalVisibility) setOptionsVisible(false);
  }, [modalVisibility]);

  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        placeholder="Search..."
        className="outline-none border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-primary transition bg-transparent rounded text-lg p-1"
      />
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="transition dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary"
        >
          <BsFillSunFill size={24} />
        </button>
        <button
          onClick={() => setOptionsVisible(true)}
          className={classNames(
            "flex items-center space-x-2 hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1 transition",
            optionsVisible
              ? "dark:border-white border-primary text-primary dark:text-white"
              : "dark:border-dark-subtle border-light-subtle text-light-subtle dark:text-dark-subtle"
          )}
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
        {optionsVisible && (
          <CreateOptions
            options={options}
            onClose={() => setOptionsVisible(false)}
            visible={optionsVisible}
          />
        )}
      </div>
    </div>
  );
};

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "options-container";

  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains("animate-scale-reverse")) onClose();
    e.target.classList.remove("animate-scale");
  };

  const handleClose = (e) => {
    if (!visible) return;
    const { parentElement, id } = e.target;
    if (parentElement.id === containerID || id === containerID) return;

    if (container.current) {
      if (!container.current.classList.contains("animate-scale"))
        container.current.classList.add("animate-scale-reverse");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
    };
    //eslint-disable-next-line
  }, [visible]);

  return (
    <div
      id={containerID}
      ref={container}
      onAnimationEnd={(e) => handleAnimationEnd(e)}
      className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale z-10"
    >
      {options.map(({ title, onClick }, idx) => (
        <Option key={idx} onClick={onClick}>
          {title}
        </Option>
      ))}
    </div>
  );
};

const Option = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="dark:text-white text-secondary hover:opacity-80 transition"
  >
    {children}
  </button>
);

export default Header;
