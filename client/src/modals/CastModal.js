import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

const CastModal = ({ casts = [], onClose, onRemove }) => {
  return (
    <ModalContainer ignoreContainer onClose={onClose}>
      <div className="p-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto space-y-2">
        {casts.map(({ profile, roleAs, leadActor }, idx) => {
          const { name, id, avatar } = profile;
          return (
            <div
              key={id}
              className="flex space-x-3 dark:bg-secondary bg-white drop-shadow-md rounded"
            >
              <img
                className="w-16 h-16 aspect-square rounded object-cover"
                src={avatar}
                alt={name}
              />
              <div className="flex flex-col w-full justify-between p-1">
                <div>
                  <p className="font-semibold dark:text-white text-primary">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle">
                    {roleAs}
                  </p>
                </div>
                {leadActor && (
                  <AiOutlineCheck className="text-light-subtle dark:text-dark-subtle" />
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(idx, profile)}
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default CastModal;
