import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import HomeProvider, { HomeContext } from "../context/Home";
import Feed from "../components/Feed";
import Friends from "../components/Friends";
import My from "../components/My";

const Home: React.FC = () => {
  const { currentPage } = useContext(HomeContext);

  useEffect(() => {
    console.log("CURRENT PAGE IN HOME: ", currentPage);
  }, [currentPage]);

  return (
    <>
      <Header showBackBtn={false} />
      <div className="content">
        <SideMenu />
        {currentPage === "Feed" && <Feed />}
        {currentPage === "Friends" && <Friends />}
        {currentPage === "My" && <My />}
      </div>
    </>
  );
};

export default Home;
