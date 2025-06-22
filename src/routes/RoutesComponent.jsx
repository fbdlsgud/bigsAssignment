import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../pages/user/SignUp";
import SignIn from "../pages/user/SignIn";
import Boards from "../pages/board/Boards";
import { useAuth } from "../context/AuthContext";
import BoardWrite from "../pages/board/BoardWrite";
import BoardDetail from "../pages/board/BoardDetail";
import BoardEdit from "../pages/board/BoardEdit";
import { PacmanLoader } from "react-spinners";

export default function RoutesComponent() {
  const { isLogin, authLoading } = useAuth();

    if(authLoading) return <PacmanLoader />;

  return (
    <Routes>
      <Route
        path="/boards"
        element={isLogin ? <Boards /> : <Navigate to="/signin" />}
      />

      <Route path="/write" element={isLogin ? <BoardWrite /> : <Navigate to="/" />} />
      <Route path="/boards/:id" element={isLogin ? <BoardDetail /> : <Navigate to="/" />}/>
      <Route path="/boards/:id/edit" element={isLogin ? <BoardEdit /> : <Navigate to="/" />}/>

      <Route path="/" element={isLogin ? <Navigate to="/boards" />:<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}
