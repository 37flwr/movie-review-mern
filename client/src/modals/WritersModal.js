import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

const WritersModal = ({ profiles = [], onClose, onRemove }) => {
  return (
    <ModalContainer ignoreContainer onClose={onClose}>
      <div className="p-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto space-y-2">
        {profiles.map(({ id, name, avatar }, idx) => (
          <div key={id} className="flex space-x-3">
            <img
              className="w-16 h-16 aspect-square rounded object-cover"
              src={avatar}
              alt={name}
            />
            <p className="w-full font-semibold dark:text-white text-primary">
              {name}
            </p>
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="dark:text-white text-primary hover:opacity-80 transition p-2"
            >
              <AiOutlineClose />
            </button>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};

export default WritersModal;
