import classNames from "classnames";
import React, { useState } from "react";
import SubmitButton from "../components/form/formElements/SubmitButton";
import { genres } from "../utils/genres";
import ModalContainer from "./ModalContainer";

const GenresModal = ({ onClose, onChange, initialValues }) => {
  const [selectedGenres, setSelectedGenres] = useState(
    initialValues ? [...initialValues] : []
  );

  const handleGenresSelector = (value) => {
    if (selectedGenres.includes(value)) {
      // setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
      setSelectedGenres((currState) =>
        currState.filter((genre) => genre !== value)
      );
    } else {
      setSelectedGenres((currState) => [...currState, value]);
    }
  };

  const handleSubmit = () => {
    onChange("genres", selectedGenres);
    onClose();
  };

  const handleClose = () => {
    setSelectedGenres([]);
    onClose();
  };

  return (
    <ModalContainer onClose={handleClose}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
            Select Genres
          </h1>
          <div className="space-y-3">
            {genres.map((genre, idx) => (
              <Genre
                onClick={() => handleGenresSelector(genre)}
                key={idx}
                selected={selectedGenres.includes(genre)}
              >
                {genre}
              </Genre>
            ))}
          </div>
        </div>
        <div className="w-56 self-end">
          <SubmitButton value="Select" type="button" onClick={handleSubmit} />
        </div>
      </div>
    </ModalContainer>
  );
};

const Genre = ({ children, selected, onClick }) => {
  const basicGenreCardClasses =
    "border-2 dark:border-dark-subtle border-light-subtle dark:text-white text-primary p-1 rounded mr-3";
  const selectedGenreCardClasses =
    "dark:bg-white bg-light-subtle dark:text-primary text-white";
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        selected && selectedGenreCardClasses,
        basicGenreCardClasses
      )}
    >
      {children}
    </button>
  );
};

export default GenresModal;
