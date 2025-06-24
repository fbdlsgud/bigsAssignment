import { createContext, useContext, useEffect, useState } from "react";

import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false); // 로그인 여부

  // 토큰의 유무를 확인 후, 사용자 정보를 저장하는 동안 렌더링을 지연시키기 위한 로딩 상태
  const [authLoading, setAuthLoading] = useState(true); 

  const [userInfo, setUserInfo] = useState({}); // 사용자 정보


 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // 로컬스토리지에 token 존재 시 로그인 상태로 판단
    if (token) {
      setIsLogin(true);

    // accessToken을 디코딩해서 사용자 정보 추출 후 저장 
      const decoded = jwtDecode(token);
      setUserInfo({name: decoded.name, username: decoded.username});
    } 
    setAuthLoading(false); 
  }, []);
  


  // 로그인 함수 : 로컬스토리지에 accessToken, 사용자 정보를 저장
  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const decoded = jwtDecode(accessToken);
    setUserInfo({name: decoded.name, username: decoded.username});

    setIsLogin(true);
  };

  // 로그아웃 함수 : 로컬스토리지에 accessToken, 로그인 상태 해제
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
