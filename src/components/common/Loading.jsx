import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999l;
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <PacmanLoader color="#36d7b7" size={25} />
    </LoadingWrapper>
  );
}
