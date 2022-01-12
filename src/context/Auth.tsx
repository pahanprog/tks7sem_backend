import React, { createContext, useState } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  user?: {
    id: number;
    username: string;
    profilePicture?: string;
  };
  setIsLoggedIn: (value: boolean) => void;
  setUser: (
    value: { id: number; username: string; profilePicture?: string } | null
  ) => void;
}>({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<{
    id: number;
    username: string;
    profilePicture?: string;
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
