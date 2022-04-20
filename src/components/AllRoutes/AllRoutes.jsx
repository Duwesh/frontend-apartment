import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "../register/Register";
import Login from "../login/Login";
import Main from "../main/Main";
import AddFlat from "../addFlat/AddFlat";
import EditFlat from "../editFlat/EditFlat";
import Residents from "../residents/Residents";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/addFlat" element={<AddFlat />} />
        <Route path="/editFlat" element={<EditFlat />} />
        <Route path="/residents" element={<Residents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
