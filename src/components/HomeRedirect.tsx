import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { AuthContext } from "../context/Auth";

const HomeRedirect = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? <Home /> : <Navigate to="/register" />}</>;
};

export default HomeRedirect;
