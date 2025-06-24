import { useNavigate } from "react-router-dom";
import instance from "../../api/axiosInstance";
import AuthInput from "../../components/user/AuthInput";
import styles from "./SignUp.module.css";

import { useState } from "react";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 각 필드별 에러메세지
  const [errorMsg, setErrorMsg] = useState({});

  const navigate = useNavigate();

  // 이메일 & 비밀번호 정규식
  const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;


  // 각 필드별 유효성 검사 함수 start
  const validatedUsername = (username) => {
    if (!username) return "이메일을 입력해주세요.";
    if (!usernameRegex.test(username)) return "이메일 형식이 아닙니다.";
    return null;
  };

  const validatedName = (name) => {
    if(!name) return "닉네임을 입력해주세요.";
    return null;
  }

  const validatedPassword = (password) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (!passwordRegex.test(password))
      return "비밀번호는 8자 이상, 숫자와 영문자 특수문자를 포함해야 합니다.";
    return null;
  };

  const validatedConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return "비밀번호 확인란을 입력해주세요.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return null;
  };
  // 각 필드별 유효성 검사 함수 end


  // 회원가입 요청 핸들러
  const signUpHandler = async (e) => {
    e.preventDefault();

    // 전체 유효성 검사
    const totalValidate = {
      username: validatedUsername(username),
      name: validatedName(name),
      password: validatedPassword(password),
      confirmPassword: validatedConfirmPassword(confirmPassword),
    };

    // 하나라도 에러메세지 존재하면 에러메세지 세팅 후 종료
    if(Object.values(totalValidate).some(value => value !== null)) {
      setErrorMsg(totalValidate);
      alert("입력한 내용을 다시 확인해주세요.");
      return ;
    }
   

    try {
      const res = await instance.post("/auth/signup", {
        username,
        name,
        password,
        confirmPassword,
      });

      alert("회원가입이 완료되었습니다.");

      setTimeout(() => {
        navigate("/signin");
      }, 300);
    } catch (err) {
      if (err.response.status === 400) { // 400에러 일 경우 : 서버에서 보낸 에러 메시지 출력
        setErrorMsg(err.response.data);
      } else { // 그 외의 에러 상항
        alert("예상치 못한 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpForm}>
        <Title>회원가입</Title>

        <form onSubmit={signUpHandler}>
          <AuthInput
            label="이메일"
            type="text"
            name="username"
            autoComplete="email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMsg((prev) => ({
                ...prev,
                username: validatedUsername(e.target.value),
              }));
            }}
            error={errorMsg.username}
          />

          <AuthInput
            label="닉네임"
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMsg((prev) => ({
                ...prev,
                name: validatedName(e.target.value),
              }));
            }}
            error={errorMsg.name}
          />

          <AuthInput
            label="비밀번호"
            subLabel="(8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합)"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg((prev) => ({
                ...prev,
                password: validatedPassword(e.target.value),
              }));
            }}
            error={errorMsg.password}
          />

          <AuthInput
            label="비밀번호 확인"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorMsg((prev) => ({
                ...prev,
                confirmPassword: validatedConfirmPassword(e.target.value),
              }));
            }}
            error={errorMsg.confirmPassword}
          />

          <Button type="submit">회원가입</Button>
        </form>
      </div>
    </div>
  );
}
