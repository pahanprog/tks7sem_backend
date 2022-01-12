import React, { useContext } from "react";
import NoPfp from "../images/svg/NoPfp";
import { AuthContext } from "../context/Auth";
import { useLogoutMutation } from "../generated/graphql";
import "../styles/header.css";

interface HeaderProps {
  showBackBtn: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackBtn }) => {
  const { setIsLoggedIn, setUser, user } = useContext(AuthContext);
  const [{}, logout] = useLogoutMutation();

  const handleLogout = async () => {
    const result = await logout();

    if (result.data.logout) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <div className="app_header">
      <div className="app_header_inner">
        <div>
          <div className="logo"></div>
        </div>
        <div className="profile_container">
          <div className="current_user_info">
            <div className="pfp">
              {user.profilePicture ? (
                <img
                  draggable={false}
                  src={`data:image/jpeg;base64,${user.profilePicture}`}
                  style={{
                    width: 30,
                    height: 30,
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <NoPfp width={30} height={30} fill="black" />
              )}
            </div>
            {user.username}
          </div>
          <div className="logout_btn" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
