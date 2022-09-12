import React from "react";

const SubmitButton = ({ value }) => {
  return (
    <input
      type="submit"
      className="w-full rounded bg-white text-secondary hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer p-1"
      value={value}
    />
  );
};

export default SubmitButton;
