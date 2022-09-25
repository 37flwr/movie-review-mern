import React, { useState } from "react";
import Options from "./Options";

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);

  if (!profile) return null;
  const { name, about = "", avatar } = profile;

  const formatName = (name) => {
    const ACCEPTED_NAME_LENGTH = 15;
    if (name.length <= ACCEPTED_NAME_LENGTH) return name;

    return name.substring(0, ACCEPTED_NAME_LENGTH) + "..";
  };

  return (
    <div className="dark:bg-secondary bg-white shadow h-20 rounded overflow-hidden">
      <div
        className="flex cursor-pointer relative"
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />
        <div className="flex flex-col px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
            {formatName(name)}
          </h1>
          <p className="text-primary dark:text-white">
            {about.substring(0, 50)}
          </p>
        </div>
        {showOptions && (
          <Options
            onDelete={() => console.log("delete")}
            onEdit={() => console.log("edit")}
          />
        )}
      </div>
    </div>
  );
};

export default ActorProfile;