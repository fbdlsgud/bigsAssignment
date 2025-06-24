import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../common/ConfirmModal";
import { useState } from "react";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px;
    gap: 10px;
  }
`;

const Logo = styled.label`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  margin: 0 12px;

  &:hover {
    color: royalblue;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0 auto;
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-item: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const UserInfo = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: #333;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLogin, logout, userInfo } = useAuth();

  // 로그아웃 모달 상태
  const [modalVisible, setModalVisible] = useState(false);


  const modalHandler = () => {
    setModalVisible(true);
  };

  // 로그아웃 함수 호출 후 모달 닫기
  const logoutHandler = () => {
    logout();
    setModalVisible(false);
  };

  // 로고 클릭시 현 위치가 boards 면 새로고침, 아닐시 boards 로 이동
  const logoClick = () => {
    if (location.pathname === "/boards") {
      navigate(0);
    } else {
      navigate("/boards");
    }
  };

  return (
    <>
      <HeaderContainer>
        <Logo onClick={logoClick}>Bigs holdings</Logo>

        {isLogin ? (
          <RightMenu>
            <UserInfo onClick={modalHandler}>
              {userInfo.name}({userInfo.username})님 안녕하세요!
            </UserInfo>
          </RightMenu>
        ) : (
          ""
        )}
      </HeaderContainer>
      {modalVisible && (
        <ConfirmModal
          onClick={logoutHandler}
          onClose={() => setModalVisible(false)}
        >
          로그아웃 하시겠습니까?
        </ConfirmModal>
      )}
    </>
  );
}
