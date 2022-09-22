import React from "react";

const ModalContainer = ({ children, ignoreContainer, onClose }) => {
  const handleClick = (e) => {
    if (onClose) {
      if (e.target.id === "modal-container") onClose();
    }
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;
    return (
      <div className="p-2 dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto  custom-scroll-bar">
        {children}
      </div>
    );
  };

  return (
    <div
      id="modal-container"
      onClick={handleClick}
      className="fixed inset-0 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
};

export default ModalContainer;
