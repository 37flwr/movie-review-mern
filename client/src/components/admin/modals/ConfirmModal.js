import classNames from "classnames";
import React from "react";
import { ImSpinner3 } from "react-icons/im";
import ModalContainer from "../../../modals/ModalContainer";

const ConfirmModal = ({
  onClose,
  busy,
  onConfirm,
  onCancel,
  subtitle,
  title,
}) => {
  const commonClasses = "px-3 py-1 text-white rounded";
  return (
    <ModalContainer onClose={onClose} ignoreContainer>
      <div className="dark:bg-primary bg-white rounded p-3">
        <h1 className="text-red-400 font-semibold text-lg">{title}</h1>
        <p className="dark:text-white text-secondary text-sm">{subtitle}</p>

        <div className="flex items-center space-x-3 mt-3">
          {busy ? (
            <p className="flex items-center space-x-2 dark:text-white text-primary">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait...</span>
            </p>
          ) : (
            <>
              <button
                type="button"
                className={classNames(commonClasses, "bg-red-400")}
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className={classNames(commonClasses, "bg-blue-400")}
                onClick={onCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
