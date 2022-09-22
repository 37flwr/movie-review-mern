import classNames from "classnames";
import React from "react";

const commonPosterUI =
  "flex items-center justify-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer";

const PosterSelector = ({
  name,
  accept,
  selectedPoster,
  onChange,
  customClassName,
  label = "Select Poster",
}) => {
  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        id={name}
        type="file"
        hidden
        name={name}
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            alt=""
            className={classNames(
              commonPosterUI,
              "object-cover",
              customClassName
            )}
          />
        ) : (
          <PosterUI customClassName={customClassName} label={label} />
        )}
      </label>
    </div>
  );
};

const PosterUI = ({ customClassName, label }) => (
  <div className={classNames(commonPosterUI, customClassName)}>
    <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
  </div>
);

export default PosterSelector;
