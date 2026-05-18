import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Users from "./pages/Users";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/users" element={<Users />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;