import classNames from "classnames";
import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../hooks";
import { createUrlForUI } from "../../utils/helper";
import { genderOptions } from "../../utils/options";
import { commonFormInputClasses } from "../../utils/theme";
import PosterSelector from "./formElements/PosterSelector";
import Selector from "./formElements/Selector";

const defaultActorInfo = {
  name: "",
  about: "",
  gender: "",
  avatar: null,
};

const validateActor = ({ name, about, gender, avatar }) => {
  if (!name.trim()) return { error: "Actor name cannot be empty" };
  if (!about.trim()) return { error: "About cannot be empty" };
  if (!gender.trim()) return { error: "Gender cannot be empty" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image / avatar file" };
  return { error: null };
};

const ActorForm = ({ title, btnTitle, busy, onSubmit }) => {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const { name, about, gender } = actorInfo;
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");

  const { updateNotification } = useNotification();

  const handleInputChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar") {
      const file = files[0];
      setSelectedAvatarForUI(createUrlForUI(file));
      return setActorInfo((currState) => ({ ...currState, avatar: file }));
    }
    setActorInfo((currState) => ({ ...currState, [name]: value }));
  };
  const handleSelectChange = (name, value) => {
    setActorInfo({ ...actorInfo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);
    else {
      const formData = new FormData();
      for (let key in actorInfo) {
        if (key) formData.append(key, actorInfo[key]);
      }
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={onSubmit && handleSubmit}
      className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="h-8 w-24 flex items-center justify-center rounded dark:bg-white bg-primary dark:text-primary text-white hover:opacity-80 transition"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-2">
        <PosterSelector
          name="avatar"
          onChange={handleInputChange}
          label="Select avatar"
          accept="image/jpg, image/jpeg, image/png"
          selectedPoster={selectedAvatarForUI}
          customClassName="w-36 h-36 aspect-square object-cover rounded"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Enter name"
            className={classNames(commonFormInputClasses, "border-b-2")}
            name="name"
            value={name}
            onChange={handleInputChange}
          />

          <textarea
            placeholder="About"
            className={classNames(
              commonFormInputClasses,
              "border-b-2 resize-none h-full custom-scroll-bar"
            )}
            name="about"
            value={about}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-3">
        <Selector
          options={genderOptions}
          label="Gender"
          name="gender"
          value={gender}
          onChange={handleSelectChange}
        />
      </div>
    </form>
  );
};

export default ActorForm;
