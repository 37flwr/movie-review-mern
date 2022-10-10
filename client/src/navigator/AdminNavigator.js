import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ActorUpload from "../components/admin/modals/ActorUpload";
import MovieUpload from "../components/admin/modals/MovieUpload";
import Header from "../components/admin/navigation/Header";
import Navbar from "../components/admin/navigation/Navbar";
import { adminRoutes } from "../routes/adminRoutes";

const AdminNavigator = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const renderModal = (modalType) => {
    switch (modalType) {
      case "movie":
        return <MovieUpload onClose={handleHideModal} />;
      case "actor":
        return <ActorUpload onClose={handleHideModal} />;
      default:
        return null;
    }
  };

  const handleHideModal = () => {
    setModalType(null);
    setShowModal(false);
  };
  const handleDisplayModal = (modalType) => {
    setModalType(modalType);
    setShowModal(true);
  };

  return (
    <div className="flex dark:bg-primary bg-white">
      <Navbar />
      <div className="flex-1 max-w-screen-xl relative">
        <Header
          onAddMovieClick={() => handleDisplayModal("movie")}
          onAddActorClick={() => handleDisplayModal("actor")}
          modalVisibility={showModal}
        />
        <Routes>
          {adminRoutes.map(({ path, component: Component }) => (
            <Route path={path} element={Component} />
          ))}
        </Routes>
        {showModal && renderModal(modalType)}
      </div>
    </div>
  );
};

export default AdminNavigator;
