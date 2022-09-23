import React from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import OptionButton from "./OptionButton";

const Options = ({ onDelete, onEdit }) => {
  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm h-20 flex items-center justify-center space-x-3">
      <OptionButton type="delete" onClick={onDelete}>
        <BsTrash />
      </OptionButton>
      <OptionButton type="edit" onClick={onEdit}>
        <BsPencilSquare />
      </OptionButton>
    </div>
  );
};

export default Options;
