import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../admin/Navbar";
import { adminRoutes } from "../routes/adminRoutes";

const AdminNavigator = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-2 max-w-screen-xl">
        <Routes>
          {adminRoutes.map(({ path, component: Component }) => (
            <Route path={path} element={Component} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;
