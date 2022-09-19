import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../routes/publicRoutes";

const UserNavigator = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, component: Component }) => (
        <Route path={path} element={Component} />
      ))}
    </Routes>
  );
};

export default UserNavigator;
