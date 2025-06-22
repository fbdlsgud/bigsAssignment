import { createContext, useContext, useEffect, useState } from "react";

import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    const token = localStorage.getItem("accessToken");


    if (token) {
      setIsLogin(true);

        const decoded = jwtDecode(token);
    setUserInfo({name: decoded.name, username: decoded.username});
    } 
    setAuthLoading(false);
  }, []);
  



  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const decoded = jwtDecode(accessToken);
    setUserInfo({name: decoded.name, username: decoded.username});



    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, authLoading, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
