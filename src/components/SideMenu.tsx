import React, { useContext } from "react";
import { HomeContext } from "../context/Home";
import NoPfp from "../images/svg/NoPfp";
import "../styles/sideMenu.css";

const SideMenu = () => {
  const { setCurrentPage } = useContext(HomeContext);

  return (
    <div className="side_main">
      <div className="menu_item" onClick={() => setCurrentPage("My")}>
        <div className="icon">
          <NoPfp width={20} height={20} fill="black" />
        </div>
        My page
      </div>
      <div className="menu_item" onClick={() => setCurrentPage("Feed")}>
        <div className="icon">
          <NoPfp width={20} height={20} fill="black" />
        </div>
        Feed
      </div>
      <div className="menu_item" onClick={() => setCurrentPage("Friends")}>
        <div className="icon">
          <NoPfp width={20} height={20} fill="black" />
        </div>
        Friends
      </div>
    </div>
  );
};

export default SideMenu;
