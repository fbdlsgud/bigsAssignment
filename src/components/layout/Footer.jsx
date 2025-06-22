import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  height: 60px;
  padding: 20px 0;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  margin-top: auto;
  width: 100%;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    color: #555;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>2025 Bigs. All rights reserved</FooterContent>
    </FooterContainer>
  );
}
