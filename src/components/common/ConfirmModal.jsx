import styled, { keyframes } from "styled-components";
import Button from "./Button";

const fadeIn = keyframes`
        0% {opacity:0;}
        100% {opacity:1;}
`;

const slideUp = keyframes`
        0% {transform: translteY(20px); opacity:0;}
        100% {transform: translteY(0); opacity:1;}
`;

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
  animation: ${slideUp} 0.3s ease-in-out;

    @media (max-width:768px) {
        min-width: 200px;
        padding: 16px 24px;
    }

`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalText = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: 400;
  margin-bottom: 24px;


  
    @media (max-width:768px) {
   font-size: 14px;
    }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 16px;
  margin-top: 0px;

  
    @media (max-width:768px) {
      font-size: 20px;
    }
`;

export default function ConfirmModal({ children, onClick, onClose }) {
  return (
    <Layout>
      <ModalContainer>
        <ModalTitle>알림</ModalTitle>
        <ModalText>{children}</ModalText>
        <BtnContainer>
          <Button onClick={onClick}>확인</Button>
          <Button onClick={onClose} $bg={"#d9534f"} $hoverBg={"#c9302c"}>
            취소
          </Button>
        </BtnContainer>
      </ModalContainer>
    </Layout>
  );
}
