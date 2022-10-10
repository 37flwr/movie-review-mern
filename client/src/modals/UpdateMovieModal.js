import React from "react";
import MovieForm from "../components/form/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovieModal = ({ values, handleChange, onSubmit }) => {
  return (
    <ModalContainer>
      <MovieForm
        values={values}
        handleChange={handleChange}
        onSubmit={onSubmit}
        btnTitle="Update"
      />
    </ModalContainer>
  );
};

export default UpdateMovieModal;
