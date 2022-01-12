import React, { useState } from "react";
import Incoming from "./Incoming";
import Mutual from "./Mutual";
import New from "./New";
import Outgoing from "./Outgoing";

const Friends = () => {
  const [currentPage, setCurrentPage] = useState<
    "Mutual" | "Incoming" | "Outgoing" | "New"
  >("Mutual");

  return (
    <div className="home_content">
      <div className="friend_header">
        <div
          className="fr_header_item"
          style={{
            backgroundColor:
              currentPage !== "Mutual"
                ? "transparent"
                : "rgba(0, 206, 209, 0.1)",
          }}
          onClick={() => {
            setCurrentPage("Mutual");
          }}
        >
          Mutual friends
        </div>
        <div
          className="fr_header_item"
          style={{
            backgroundColor:
              currentPage !== "Incoming"
                ? "transparent"
                : "rgba(0, 206, 209, 0.1)",
          }}
          onClick={() => {
            setCurrentPage("Incoming");
          }}
        >
          Incoming requests
        </div>
        <div
          className="fr_header_item"
          style={{
            backgroundColor:
              currentPage !== "Outgoing"
                ? "transparent"
                : "rgba(0, 206, 209, 0.1)",
          }}
          onClick={() => {
            setCurrentPage("Outgoing");
          }}
        >
          Outgoing requests
        </div>
        <div
          className="fr_header_item"
          style={{
            backgroundColor:
              currentPage !== "New" ? "transparent" : "rgba(0, 206, 209, 0.1)",
          }}
          onClick={() => {
            setCurrentPage("New");
          }}
        >
          Find new friends
        </div>
      </div>
      <div className="fr_current">
        {currentPage === "Mutual" && <Mutual />}
        {currentPage === "Incoming" && <Incoming />}
        {currentPage === "Outgoing" && <Outgoing />}
        {currentPage === "New" && <New />}
      </div>
    </div>
  );
};

export default Friends;
