import classNames from "classnames";
import React, { startTransition, useState } from "react";
import { searchActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import CastModal from "../../modals/CastModal";
import GenresModal from "../../modals/GenresModal";
import WritersModal from "../../modals/WritersModal";
import { createUrlForUI } from "../../utils/helper";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import { commonFormInputClasses } from "../../utils/theme";
import CastForm from "./CastForm";
import GenresSelector from "./formElements/GenresSelector";
import LiveSearch from "./formElements/LiveSearch";
import PosterSelector from "./formElements/PosterSelector";
import Selector from "./formElements/Selector";
import SubmitButton from "./formElements/SubmitButton";
import TagsInput from "./formElements/TagsInput";

const MovieForm = ({ values, handleChange, onClose }) => {
  const [showModal, setShowModal] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState(null);

  const [directorRes, setDirectorRes] = useState([]);

  const { updateNotification } = useNotification();

  // Update values
  const handleValueChange = (id, value) => {
    handleChange((currState) => ({ ...currState, [id]: value }));
  };
  const handleFileUpdate = (id, value) => {
    if (value.target.files[0]) {
      setSelectedPosterForUI(createUrlForUI(value.target.files[0]));
      return handleChange((currState) => ({
        ...currState,
        [id]: value.target.files[0],
      }));
    }
    return updateNotification("error", "File is missing");
  };
  const handleArrayUpdate = (data, key) => {
    if (data) {
      if (values[key].filter((value) => value.id === data.id).length === 0) {
        handleChange((currState) => ({
          ...currState,
          [key]: [...currState[key], data],
        }));
      } else updateNotification("warning", "Already in list");
    }
  };
  const handleArrayUpdateWithProfile = (data, key) => {
    if (data) {
      if (
        values[key].filter((value) => value.profile.id === data.profile.id)
          .length === 0
      ) {
        handleChange((currState) => ({
          ...currState,
          [key]: [...currState[key], data],
        }));
      } else updateNotification("warning", "Already in list");
    }
  };
  const handleArrayUpdateWithoutId = (data, key) => {
    if (data) {
      if (values[key].filter((value) => value === data).length === 0) {
        handleChange((currState) => ({
          ...currState,
          [key]: [...currState[key], data],
        }));
      } else updateNotification("warning", "Already in list");
    }
  };
  const handleArrayDelete = (idx, key) => {
    handleChange((currState) => ({
      ...currState,
      [key]: currState[key].filter((_, i) => i !== idx),
    }));
  };
  const handleDirectorUpdate = (values, key) => {
    handleChange((currState) => ({
      ...currState,
      [key]: { ...values },
    }));
  };

  // Inputs object
  const leftSideInputs = [
    {
      title: "Title",
      id: "title",
      get input() {
        return (
          <>
            <Label htmlFor={this.id}>{this.title}</Label>
            <input
              id={this.id}
              type="text"
              placeholder="Titanic"
              value={values.id}
              onChange={({ target }) => {
                handleValueChange(this.id, target.value);
              }}
              className={classNames(
                "border-b-2 font-semibold text-xl",
                commonFormInputClasses
              )}
            />
          </>
        );
      },
    },
    {
      title: "Story Line",
      id: "storyLine",
      get input() {
        return (
          <>
            <Label htmlFor={this.id}>{this.title}</Label>
            <textarea
              id={this.id}
              placeholder="Movie story line..."
              value={values.id}
              onChange={({ target }) => {
                handleValueChange(this.id, target.value);
              }}
              className={classNames(
                "border-b-2 resize-none h-24",
                commonFormInputClasses
              )}
            />
          </>
        );
      },
    },
    {
      title: "Tags",
      id: "tags",
      get input() {
        return (
          <>
            <Label htmlFor={this.id}>{this.title}</Label>
            <TagsInput
              id={this.id}
              tags={values.tags}
              handleUpdate={handleArrayUpdateWithoutId}
              handleDelete={handleArrayDelete}
            />
          </>
        );
      },
    },
    {
      title: "Cast",
      id: "cast",
      badge: values.cast.length,
      get input() {
        return (
          <>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor={this.id} badge={this.badge}>
                Add Cast and Crew
              </LabelWithBadge>
              {values[this.id]?.length > 0 && (
                <ViewAllBtn
                  onClick={() => {
                    setModalType(this.id);
                    setShowModal(true);
                  }}
                />
              )}
            </div>
            <CastForm
              id={this.id}
              handleUpdate={handleArrayUpdateWithProfile}
              handleDelete={handleArrayDelete}
            />
          </>
        );
      },
    },
    {
      title: "Director",
      id: "director",
      get input() {
        return (
          <>
            <Label htmlFor={this.id}>{this.title}</Label>
            <LiveSearch
              withValue
              id={this.id}
              value={values.director?.name}
              // updateResults={
              // }
              results={directorRes}
              handleUpdate={handleDirectorUpdate}
            />
          </>
        );
      },
    },
    {
      title: "Writers",
      id: "writers",
      badge: values.writers.length,
      get input() {
        return (
          <>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor={this.id} badge={this.badge}>
                {this.title}
              </LabelWithBadge>
              {values[this.id]?.length > 0 && (
                <ViewAllBtn
                  onClick={() => {
                    setModalType(this.id);
                    setShowModal(true);
                  }}
                />
              )}
            </div>
            <LiveSearch id={this.id} handleUpdate={handleArrayUpdate} />
          </>
        );
      },
    },
    {
      title: "Release Date",
      id: "releaseDate",
      get input() {
        return (
          <>
            <Label htmlFor={this.id}>{this.title}</Label>
            <input
              id={this.id}
              type="date"
              value={values.releaseDate}
              onChange={({ target }) => {
                handleValueChange(this.id, target.value);
              }}
              className={classNames(
                commonFormInputClasses,
                "border-2 rounded p-1"
              )}
            />
          </>
        );
      },
    },
  ];
  const rightSideInputs = [
    {
      id: "poster",
      get input() {
        return (
          <PosterSelector
            name={this.id}
            accept="image/jpg, image/jpeg, image/png"
            selectedPoster={selectedPosterForUI}
            onChange={(e) => handleFileUpdate(this.id, e)}
          />
        );
      },
    },
    {
      id: "genres",
      get input() {
        return (
          <GenresSelector
            badge={values[this.id]?.length}
            onClick={() => {
              setModalType(this.id);
              setShowModal(true);
            }}
          />
        );
      },
    },
    {
      title: "Type",
      id: "type",
      options: typeOptions,
      get input() {
        return (
          <Selector
            onChange={handleValueChange}
            name={this.id}
            value={values[this.id]}
            label={this.title}
            options={this.options}
          />
        );
      },
    },
    {
      title: "Language",
      id: "language",
      options: languageOptions,
      get input() {
        return (
          <Selector
            onChange={handleValueChange}
            name={this.id}
            value={values[this.id]}
            label={this.title}
            options={this.options}
          />
        );
      },
    },
    {
      title: "Status",
      id: "status",
      options: statusOptions,
      get input() {
        return (
          <Selector
            onChange={handleValueChange}
            name={this.id}
            value={values[this.id]}
            label={this.title}
            options={this.options}
          />
        );
      },
    },
  ];

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    updateNotification("success", "Movie successfully added");
    onClose();
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const renderModal = (modalType) => {
    switch (modalType) {
      case "writers":
        return (
          <WritersModal
            onRemove={(idx) => {
              if (values.writers.length === 1) {
                setShowModal(false);
              }
              handleArrayDelete(idx, "writers");
            }}
            profiles={values.writers}
            onClose={handleHideModal}
          />
        );
      case "cast":
        return (
          <CastModal
            onRemove={(idx) => {
              if (values.cast.length === 1) {
                setShowModal(false);
              }
              handleArrayDelete(idx, "cast");
            }}
            casts={values.cast}
            onClose={handleHideModal}
          />
        );
      case "genres":
        return (
          <GenresModal
            onClose={handleHideModal}
            onChange={handleValueChange}
            initialValues={values.genres}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form className="flex space-x-3 p-3">
        <div className="w-[70%] space-y-5">
          {leftSideInputs.map(({ input }) => (
            <div className="flex flex-col">{input}</div>
          ))}
          <SubmitButton
            value="Upload"
            type="button"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
        <div className="w-[30%] space-y-5">
          {rightSideInputs.map(({ input }) => input)}
        </div>
      </form>
      {showModal && renderModal(modalType)}
    </>
  );
};

const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="dark:text-dark-subtle text-light-subtle font-semibold"
  >
    {children}
  </label>
);

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 translate-x-4 -translate-y-0.5 text-xs w-4 h-4 rounded-full flex items-center justify-center">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};

const ViewAllBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="dark:text-white text-primary hover:underline transition"
  >
    View All
  </button>
);

export default MovieForm;
