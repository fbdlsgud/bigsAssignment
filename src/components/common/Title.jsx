import styled from "styled-components"

const StyledTitle = styled.label`
  display:block;
  margin: 0 auto;
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  background: linear-gradient(#4a90e2, #50c9c3);
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width:768px) {
    font-size: 20px;
  }
`;

export default function Title ({children}) {

    return (
        <StyledTitle>{children}</StyledTitle>
    )
}