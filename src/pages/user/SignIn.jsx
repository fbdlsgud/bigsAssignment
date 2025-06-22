import { useState } from "react";
import AuthInput from "../../components/user/AuthInput";
import styles from "./SignIn.module.css";
import instance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const signInHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/auth/signin", { username, password });

      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      login(accessToken,refreshToken);

      alert("로그인 성공");

      navigate("/boards");
    } catch (err) {
      if (err.response?.status === 400) {
        const errMsg =
          err.response?.data?.message ||
          "로그인에 실패하였습니다. 다시 시도해주세요";
        alert(errMsg);
      } else {
        alert("예상치 못한 오류가 발생했습니다. 관리자에게 문의해주세요.");
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinForm}>
        <Title>Bigs Boards</Title>
        <form onSubmit={signInHandler}>
          <AuthInput
            label="이메일"
            type="text"
            name="email"
            autoComplete="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <AuthInput
            label="비밀번호"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.btnGrp}>
            <Button type="submit">로그인</Button>
            <Button type="button" onClick={() => navigate("/signup")}>
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
