import classNames from "classnames";
import React, { useState } from "react";
import { useNotification } from "../../hooks/index";
import { commonFormInputClasses } from "../../utils/theme";
import LiveSearch from "./formElements/LiveSearch";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ id, handleUpdate }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const { leadActor, profile, roleAs } = castInfo;

  const { updateNotification } = useNotification();

  const handleUpdateProfile = (profile) => {
    setCastInfo((currState) => ({ ...currState, profile }));
  };

  const handleSubmit = () => {
    if (!profile.name)
      return updateNotification("error", "Cast profile is missing");
    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing");
    handleUpdate(castInfo, id, true);
    setCastInfo({ ...defaultCastInfo });
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-1">
        <input
          type="checkbox"
          title="Set as lead actor"
          name="leadActor"
          className="w-4 h-4"
          checked={leadActor}
          onChange={() =>
            setCastInfo((currState) => ({
              ...currState,
              leadActor: !currState.leadActor,
            }))
          }
        />
        <span className="dark:text-white text-primary">Lead Actor</span>
      </div>
      <div className="flex items-center space-x-2">
        <LiveSearch
          value={profile?.name && profile?.name}
          handleUpdate={handleUpdateProfile}
          placeholder="Search profile"
        />
        <span className="dark:text-dark-subtle text-light-subtle font-semibold">
          as
        </span>
        <div className="flex-grow">
          <input
            type="text"
            className={classNames(
              commonFormInputClasses,
              "rounded p-1 border-2"
            )}
            placeholder="Role as"
            value={roleAs}
            onChange={({ target }) =>
              setCastInfo((currState) => ({
                ...currState,
                roleAs: target.value,
              }))
            }
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-secondary dark:text-white text-primary px-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CastForm;
