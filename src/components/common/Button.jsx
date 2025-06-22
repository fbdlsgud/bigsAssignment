import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 20px;
  padding: 10px 22px;
  background-color: ${(props) => props.$bg || "#4a90e2"};
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.5s;
  display:block;
  margin: 0 auto;
  &:hover {
    background-color:${(props) => props.$hoverBg || "#357ab8"};
  }


  @media (max-width:768px) {
    padding: 6px 16px;
    font-size: 12px;
  } 
`;

export default function Button({ children, type="button", onClick, $bg, $hoverBg }) {
  return <StyledButton type={type} onClick={onClick} $bg={$bg} $hoverBg={$hoverBg}>{children}</StyledButton>;
}
