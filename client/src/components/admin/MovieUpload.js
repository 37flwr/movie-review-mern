import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadTrailer } from "../../api/movie";
import { useNotification } from "../../hooks";
import ModalContainer from "../../modals/ModalContainer";
import MovieForm from "../form/MovieForm";

const MovieUpload = ({ onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    storyLine: "",
    tags: [],
    cast: [],
    director: {},
    writers: [],
    releaseDate: "",
    poster: null,
    genres: [],
    type: "",
    language: "",
    status: "",
    trailer: {
      url: "",
      public_id: "",
    },
  });

  const { updateNotification } = useNotification();

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);

    const { error, url, public_id } = await uploadTrailer(
      formData,
      setUploadProgress
    );
    if (!error) {
      setVideoUploaded(true);
    }

    setMovieInfo((currState) => ({
      ...currState,
      trailer: { url, public_id },
    }));
  };

  return (
    <ModalContainer>
      {!videoUploaded && videoSelected && (
        <UploadProgress
          videoUploaded={videoUploaded}
          uploadProgress={uploadProgress}
        />
      )}
      {!videoSelected && (
        <TrailerSelector
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      )}
      {uploadProgress && (
        <MovieForm
          values={movieInfo}
          onClose={onClose}
          handleChange={setMovieInfo}
        />
      )}
    </ModalContainer>
  );
};

const UploadProgress = ({ videoUploaded, uploadProgress }) => {
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      {!videoUploaded && (
        <div className="h-3 dark:bg-dark-subtle bg-light-subtle rounded relative">
          <div
            style={{ width: `${uploadProgress}%` }}
            className="h-full absolute left-0 dark:bg-white bg-secondary rounded"
          ></div>
        </div>
      )}
      <p className="mt-2 text-center font-semibold dark:text-dark-subtle text-light subtle animate-pulse">
        {uploadProgress === 100
          ? "Processing video"
          : `Upload progress ${uploadProgress}%`}
      </p>
    </div>
  );
};

const TrailerSelector = ({ handleChange, onTypeError }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        name="file"
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="flex flex-col items-center justify-center w-48 h-48 rounded-full border border-dashed dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-secondary cursor-pointer">
          <AiOutlineCloudUpload size={80} className="" />
          <p>Drop your file here</p>
        </div>
      </FileUploader>
    </div>
  );
};

export default MovieUpload;
