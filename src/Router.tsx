import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeRedirect from "./components/HomeRedirect";
import { AuthContext } from "./context/Auth";
import { useMeQuery } from "./generated/graphql";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatchPage from "./pages/NoMatchPage";
import Register from "./pages/Register";

const Router: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { setUser, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  const [{ data, fetching, error }] = useMeQuery();

  useEffect(() => {
    if (error) {
      console.error(error);
      setLoading(false);
    }

    console.log("DATA: ", data);

    if (data) {
      if (data.me) {
        setIsLoggedIn(true);
        setUser({
          id: data.me.id,
          username: data.me.username,
          profilePicture: data.me.profilePicture,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [fetching]);

  if (loading) {
    return (
      <div>
        <h1>LOADING</h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<NoMatchPage />} />
    </Routes>
  );
};

export default Router;
