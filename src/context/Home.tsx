import React, { createContext, useEffect, useState } from "react";

export const HomeContext = createContext<{
  currentPage: "My" | "Feed" | "Friends" | null;
  setCurrentPage: (value: "My" | "Feed" | "Friends") => void;
}>({
  currentPage: null,
  setCurrentPage: () => {},
});

const HomeProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<"My" | "Feed" | "Friends">(
    "My"
  );

  useEffect(() => {
    console.log("CURRENT PAGE: ", currentPage);
  }, [currentPage]);

  return (
    <HomeContext.Provider value={{ setCurrentPage, currentPage }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
